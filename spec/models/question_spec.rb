require 'rails_helper'

RSpec.describe Question, type: :model do
  describe 'factory' do
    it { expect(create(:question, :valid)).to be_a(Question) }
  end

  describe 'validation' do
    it '正常なデータ' do
      expect(build(:question, :valid).valid?).to be_truthy
    end

    it 'コメントがひとつ以上必要' do
      expect(build(:question, :valid, comments: []).valid?).to be_falsey
    end

    it 'タイトルが必要' do
      expect(build(:question, :valid, title: '').valid?).to be_falsey
    end

    it 'オーナーが必要' do
      expect(build(:question, :valid, user: nil).valid?).to be_falsey
    end
  end

  describe 'creation' do
    it 'ユーザーによる作成' do
      expect {
        Question.create_by!(User.first, {title: 'q', markdown: '# test'})
      }.to change(Question, :count).by(1)
    end

    it 'ユーザーによる作成と依頼' do
      expect {
        Question.create_by!(
          User.first,
          {
            title: 'q',
            markdown: '# test',
            assigned: [User.second.login, 'not_exist']
          })
      }.to change(AskUser, :count).by(1)
    end
  end

  describe 'behavior' do
    let(:question) { create(:question, :valid) }
    let(:other_question) { create(:question, :valid) }

    describe 'コメントの追加' do
      let(:comment) { build(:comment, :valid_for_question) }

      context do
        before :each do
          question.add_comment!(comment)
          question.reload
          comment.reload
        end

        it 'コメント数の反映' do
          expect(question.comments.size).to eq(2)
        end

        it 'コメントの確認' do
          expect(question.comments[1].markdown).to eq(comment.markdown)
        end
      end

      it '不完全なコメントは追加できない' do
        expect { question.add_comment!(Comment.new) }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end

    describe '依頼に応える' do
      before :each do
        question.assign!(User.second, User.third, User.fourth)
        question.reload
        expect(question.not_yet_user).to include(User.second)
        expect(question.not_yet_user).to include(User.third)
        expect(question.not_yet_user).to include(User.fourth)
        expect(question.not_yet_user).not_to include(User.fifth)
      end

      context '力になれません' do
        it '反応後はリストから外れる' do
          question.sorry_by(User.second)
          expect(question.not_yet_user).not_to include(User.second)
          expect(question.responded_user).to include(User.second)
        end
      end

      context '知ってそうな人を教える' do
        it '反応後はリストから外れ、新しい人がリストに入る' do
          question.assign_by(User.second, User.fifth)
          expect(question.not_yet_user).not_to include(User.second)
          expect(question.responded_user).to include(User.second)
          expect(question.not_yet_user).to include(User.fifth)
        end
      end

      context '応える' do
        it '反応後はリストから外れ、コメントが追加される' do
          question.answer_by(User.second, build(:comment, :valid))
          expect(question.not_yet_user).not_to include(User.second)
          expect(question.responded_user).to include(User.second)
          expect(question.comments.last.user).to eq(User.second)
        end
      end
    end

    describe 'リプライ' do
      let(:reply) { build(:comment, :valid) }

      context 'リプライ時' do
        before :each do
          question.reply_to!(question.root, reply)
        end

        it 'クエスチョンのコメント数に反映' do
          expect(question.comments.size).to eq(2)
        end

        it 'コメントのリプライに反映' do
          expect(question.root.comments.size).to eq(1)
        end

        it 'リプライの親に反映' do
          expect(reply.comment).to eq(question.root)
        end
      end

      it 'クエスチョンに含まれないコメントへのリプライはできない' do
        expect { question.reply_to!(other_question.root, reply) }.to raise_error(Question::CannotReplyOtherQuestionComment)
      end

      it 'idでもリプライできる' do
        question.reply_to!(question.root.id, reply)
        expect(question.root.comments.size).to eq(1)
      end
    end

    describe '回答の要求' do
      let(:owner) { question.user }
      let(:user1) { User.first }
      let(:user2) { User.second }

      it '' do
        question.assign(user1, user2)
      end
    end

    it '最古のコメントはルートコメント' do
      root = question.root
      question.add_comment!(build(:comment, :valid_for_question))
      expect(question.root).to eq(root)
    end
  end
end
