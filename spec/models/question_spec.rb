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
            assigned: [User.second.login]
          })
      }.to change(AskUser, :count).by(1)
    end
  end

  describe 'エラーメッセージの整形' do
    context 'create時' do
      it 'コメントのエラーが展開される' do
        begin
        Question.create_by!(
          User.first,
          {
            title: 'q',
            markdown: '',
            assigned: [User.second.login]
          })
        rescue => e
          expect(e.record.creation_errors[:markdown]).to be_truthy
        end
      end
    end

    context 'コメント時' do
      let(:question) { create(:question, :valid) }
      let(:after_q) { Question.find(question.id) }

     it 'コメントのエラーが展開される' do
        begin
        question.answer_by!(User.second, build(:comment, :valid, markdown: ''))
        rescue => e
          expect(e.record.answer_errors[:markdown]).to be_truthy
        end
      end
    end

    context '招待時' do
      let(:question) { create(:question, :valid) }
      let(:after_q) { Question.find(question.id) }

      it 'そのまま' do
        question.assign!(User.third)
        begin
          question.assign_by!(User.second)
        rescue => e
          expect(e.record.assign_errors).to eq(e.record.errors)
        end
      end
    end

  end

  describe 'question responder' do
    let(:question) { create(:question, :valid) }
    let(:other_question) { create(:question, :valid) }
    let(:after_q) { Question.find(question.id) }

    context '質問の終了' do
      before :each do
        expect(question.opened?).to be_truthy
      end

      it '質問主は終了できる' do
        question.finish_by!(User.first)
        expect(after_q.closed?).to be_truthy
      end

      it '質問主以外は終了できない' do
        expect{question.finish_by!(User.second)}.to raise_error(Question::NotOwner)
      end

      it '終了後は保存ができない' do
        question.finish_by!(User.first)
        expect{after_q.save!}.to raise_error(Question::AlreadyClosed)
      end
    end

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
      let(:question) { create(:question, :valid) }
      let(:after_q) { Question.find(question.id) }

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
          question.sorry_by!(User.second)
          expect(after_q.not_yet_user).not_to include(User.second)
          expect(after_q.responded_user).to include(User.second)
        end
      end

      context 'ちょっと待って' do
        it 'ステータスだけが変わる' do
          question.wait_by!(User.second)
          expect(after_q.not_yet_user).to include(User.second)
          expect(after_q.responded_user).not_to include(User.second)
          expect(after_q.not_yet_user.find(User.second.id).respond_state).to eq(AskUser.status[:wait])
        end
      end

      context '知ってそうな人を教える' do
        it '反応後はリストから外れ、新しい人がリストに入る' do
          question.assign_by!(User.second, User.fifth)
          expect(after_q.not_yet_user).not_to include(User.second)
          expect(after_q.responded_user).to include(User.second)
          expect(after_q.not_yet_user).to include(User.fifth)
        end

        it '知ってそうな人を提示しないとエラー' do
          expect{question.assign_by!(User.second)}.to raise_error(ActiveRecord::RecordInvalid)
       end

        it '不正なloginでエラー' do
          expect{question.assign_by!(User.second, 'not_exist')}.to raise_error(ActiveRecord::RecordNotFound)
       end
      end

      context '応える' do
        it '反応後はリストから外れ、コメントが追加される' do
          question.answer_by!(User.second, build(:comment, :valid))
          expect(after_q.not_yet_user).not_to include(User.second)
          expect(after_q.responded_user).to include(User.second)
          expect(after_q.comments.last.user).to eq(User.second)
        end
      end
    end

    describe 'リプライ' do
      let(:reply) { build(:comment, :valid) }

      context 'リプライ時' do
        before :each do
          question.reply_to_by!(User.second, question.root, reply)
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
        expect { question.reply_to_by!(User.second, other_question.root, reply) }.to raise_error(Question::NotInTree)
      end

      it 'idでもリプライできる' do
        question.save!
        question.reply_to_by!(User.second, question.root.id, build(:comment, :valid))
        expect(question.root.comments.size).to eq(1)
      end
    end

    describe '回答の要求' do
      let(:owner) { question.user }
      let(:user1) { User.first }
      let(:user2) { User.second }

      it '' do
        question.assign!(user1, user2)
      end
    end
  end

  describe 'sql optimization' do
    let(:q) { @q }
    let(:index) { Question.index(User.first) }

    before :all do
      # クエスチョンの作成
      q1 = create(:question, :valid)
      q2 = create(:question, :valid)
      q3 = create(:question, :valid)
      q4 = create(:question, :valid)

      # 回答をお願い
      q1.assign!(User.second, User.third, User.fourth, User.fifth)
      q2.assign!(User.second, User.third, User.fourth)
      q3.assign!(User.second)
      #q4.assign!()

      # コメントの追加
      q1.answer_by!(User.all[5], build(:comment, :valid))
      q2.answer_by!(User.all[6], build(:comment, :valid))
      q2.answer_by!(User.all[5], build(:comment, :valid))
      q3.answer_by!(User.all[6], build(:comment, :valid))
      q3.answer_by!(User.all[5], build(:comment, :valid))
      q3.answer_by!(User.all[6], build(:comment, :valid))
      q4.answer_by!(User.all[5], build(:comment, :valid))
      q4.answer_by!(User.all[6], build(:comment, :valid))

      # レスポンス
      q1.answer_by!(User.second, build(:comment, :valid))
      q1.sorry_by!(User.third)
      q2.answer_by!(User.second, build(:comment, :valid))
      q3.answer_by!(User.second, build(:comment, :valid))

      @q = [nil, q1, q2, q3, q4]
    end

    after :all do
      @q.compact.each(&:destroy!)
    end

    it '質問主の名前の挿入' do
      (1..4).to_a.each do |n|
        index_q = index.find(q[n].id)
        expect(index_q.author_name).to eq(q[n].user.name)
      end
    end

    it 'コメント数の挿入' do
      (1..4).to_a.each do |n|
        index_q = index.find(q[n].id)
        expect(index_q.commented_count).to eq(q[n].responses.size)
      end
    end

    it 'おねがいされている人数の挿入' do
      (1..4).to_a.each do |n|
        index_q = index.find(q[n].id)
        expect(index_q.assigned_count).to eq(q[n].users.size)
      end
    end

    it '反応済みの人数の挿入' do
      (1..4).to_a.each do |n|
        index_q = index.find(q[n].id)
        expect(index_q.responded_count).to eq(q[n].responded_user.size)
      end
    end
  end

  describe 'relation' do
    let(:q) { @q }

    before :all do
      q = create(:question, :valid)
      q.assign!(User.second, User.third, User.fourth)
      q.sorry_by!(User.second)
      @q = q
    end

    after :all do
      @q.destroy!
    end

    describe 'ユーザーリストを得る' do
      context 'お願いされている' do
        it do
          expect(q.users).to match_array([User.second, User.third, User.fourth])
        end
      end

      context '反応済み' do
        it do
          expect(q.responded_user).to match_array([User.second])
        end
      end

      context '反応していない' do
        it do
          expect(q.not_yet_user).to match_array([User.third, User.fourth])
        end
      end
    end

    describe 'ユーザーを調べる' do
      context 'お願いされている' do
        it do
          expect(q.assigned?(User.second)).to be_truthy
        end

        it do
          expect(q.assigned?(User.first)).to be_falsey
        end
      end

      context '反応済み' do
        it do
          expect(q.responded?(User.second)).to be_truthy
        end

        it do
          expect(q.responded?(User.third)).to be_falsey
        end
      end
    end
  end

  describe 'behavior' do
    let(:question) { create(:question, :valid) }
    let(:other_question) { create(:question, :valid) }
    let(:after_q) { Question.find(question.id) }

    context '質問主かどうか' do
      it '質問主である' do
        expect(question.owner?(User.first)).to be_truthy
      end

      it '質問主でない' do
        expect(question.owner?(User.second)).to be_falsey
      end
    end

    context 'Commentがインスタンスかどうか判断してnewする' do
      it 'Hashはnewされる' do
        params = attributes_for(:comment, :valid)

        expect(question.detect_comment(params)).to be_a(Comment)
      end

      it 'Commentはそのまま帰る' do
        comment = build(:comment, :valid)
        expect(question.detect_comment(comment)).to eq(comment)
      end
    end

    context '全員反応済みかどうか' do
      it '反応済みである' do
        question.assign!(User.second)
        question.sorry_by!(User.second)
        expect(after_q.all_responded?).to be_truthy
      end

      it '反応済みでない' do
        question.assign!(User.second)
        expect(after_q.all_responded?).to be_falsey
      end
    end

    context '質問本文であるか' do
      it '本文である' do
        question.answer_by!(User.second, build(:comment, :valid))
        expect(after_q.root?(after_q.comments.first)).to be_truthy
      end

      it '本文ではない' do
        question.answer_by!(User.second, build(:comment, :valid))
        expect(after_q.root?(after_q.responses.first)).to be_falsey
      end
    end

    context '全コメントのツリーを形成する' do
      let(:q) { @q }
      let(:a) { @a }
      let(:r) { @r }
      let(:comment_tree) { q.comment_tree }

      before :all do
        q = create(:question, :valid)
        a1 = q.answer_by!(User.second, build(:comment, :valid))
        a2 = q.answer_by!(User.second, build(:comment, :valid))
        a3 = q.answer_by!(User.second, build(:comment, :valid))
        r1 = q.reply_to_by!(User.third, a1, build(:comment, :valid))
        r2 = q.reply_to_by!(User.third, a1, build(:comment, :valid))
        r3 = q.reply_to_by!(User.third, a2, build(:comment, :valid))
        r4 = q.reply_to_by!(User.fourth, r3, build(:comment, :valid))

        @a = [nil, a1, a2, a3]
        @r = [nil, r1, r2, r3]
        @q = q
      end

      after :all do
        @q.destroy!
      end

      it do
        expect(comment_tree[q.root.id].size).to eq(3)
      end

      it do
        expect(comment_tree[a[1].id].size).to eq(2)
      end

      it do
        expect(comment_tree[a[2].id].size).to eq(1)
      end

      it do
        expect(comment_tree[a[3].id]).to be_nil
      end

      it do
        expect(comment_tree[r[3].id].size).to eq(1)
      end

      it do
        expect(comment_tree[r[1].id]).to be_nil
      end

      it do
        expect(comment_tree[r[2].id]).to be_nil
      end
    end


    it '最古のコメントはルートコメント' do
      root = question.root
      question.add_comment!(build(:comment, :valid_for_question))
      expect(question.root).to eq(root)
    end
  end
end
