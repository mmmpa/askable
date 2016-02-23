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

  describe 'behavior' do
    let(:question) { create(:question, :valid) }
    let(:other_question) { create(:question, :valid) }

    context 'コメントの追加' do
      let(:comment) { build(:comment, :valid_for_question) }

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

    context 'リプライ' do
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


    it '最古のコメントはルートコメント' do
      root = question.root
      question.add_comment!(build(:comment, :valid_for_question))
      expect(question.root).to eq(root)
    end
  end
end
