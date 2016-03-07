require 'rails_helper'

RSpec.describe "Questions", type: :request do
  let(:json) {
    parsed = JSON.parse(response.body)
    Array === parsed ? {array: parsed}.deep_symbolize_keys![:array] : parsed.deep_symbolize_keys!
  }

  before :each do
    authlogic_login(User.first)
  end

  let(:q) { @q }

  before :all do
    Question.destroy_all
    
    q = []
    8.times { q.push create(:question, :valid) }
    7.times { q.push create(:question, :valid, user: User.second) }
    q[10].assign!(User.first)
    q[11].assign!(User.first)
    q[11].assign!(User.third)
    q[0].finish_by!(User.first)
    q[2].answer_by!(User.first, {markdown: 'test'})
    q[11].answer_by!(User.first, {markdown: 'test'})
    @q = q
  end

  after :all do
    q.each(&:destroy)
  end

  describe 'helper' do
    context '各種アイコンの表示' do
      it '質問ページ' do
        q = create(:question, :valid)
        q.assign!(User.second, User.third, User.fourth, User.fifth)
        q.sorry_by!(User.second)
        q.wait_by!(User.third)
        q.answer_by!(User.fourth, {markdown: '# answered'})
        q.assign_by!(User.fifth, User.all[5])

        get question_path(q.id)
        expect(response.body).to have_tag('.show-question.responded-list .fa-assigned')
        expect(response.body).to have_tag('.show-question.not-yet-list .fa-waited')
        expect(response.body).to have_tag('.show-question.responded-list .fa-answered')
        expect(response.body).to have_tag('.show-question.responded-list .fa-sorryed')
      end


      it 'インデックスページ' do
        get questions_path
        expect(response.body).to have_tag('.question-index.item-icon .fa-assigned')
        expect(response.body).to have_tag('.question-index.item-icon .fa-all-responded')
        expect(response.body).to have_tag('.question-index.item-icon .fa-opened')

        expect(response.body).to have_tag('.question-index.item-icon .fa-closed')
      end
    end

    it 'コメントに対するリプライの描画' do |variable|
      q = create(:question, :valid)
      q.answer_by!(User.fourth, {markdown: '# answered'})
      q.reply_to_by!(User.fourth, q.responses.first, {markdown: '# answered'})

      get question_path(q.id)
      expect(response.body).to have_tag('.show-question.response .wrap')
    end
  end

  describe 'display' do
    context '質問を表示' do
      context 'コメントがないときのマーク' do
        it 'コメントのない質問' do
          get question_path(q[1].id)
          expect(response).to have_http_status(200)
          expect(response.body).to have_tag('.show-question.no-response')
          expect(response.body).not_to have_tag('.show-question.response')
        end

        it 'コメントがある質問' do
          get question_path(q[2].id)
          expect(response).to have_http_status(200)
          expect(response.body).not_to have_tag('.show-question.no-response')
          expect(response.body).to have_tag('.show-question.response')
        end

        it '終了した場合はマークを出さない' do
          get question_path(q[0].id)
          expect(response).to have_http_status(200)
          expect(response.body).not_to have_tag('.show-question.no-response')
          expect(response.body).not_to have_tag('.show-question.response')
          expect(response.body).to have_tag('.show-question.closed')
        end
      end

      context '終了したマーク' do
        it '終了した質問' do
          get question_path(q[0].id)
          expect(response).to have_http_status(200)
          expect(response.body).to have_tag('.show-question.closed')
        end

        it '終了していない質問' do
          get question_path(q[1].id)
          expect(response).to have_http_status(200)
          expect(response.body).not_to have_tag('.show-question.closed')
        end
      end
    end
  end

  describe 'indexing' do
    it 'すべての質問を表示（上限10）' do
      get questions_path
      expect(response.body).to have_tag('.question-index.list-item', count: 10)
    end

    it 'すべての質問を表示（上限10）' do
      get questions_path, page: 2
      expect(response.body).to have_tag('.question-index.list-item', count: 5)
    end

    it '受付中の質問を表示' do
      get opened_questions_path, page: 2
      expect(response.body).to have_tag('.question-index.list-item', count: 4)
    end

    it '自分がした質問を表示' do
      get asked_questions_path
      expect(response.body).to have_tag('.question-index.list-item', count: 8)
    end

    it '自分が質問されている質問を表示' do
      get requested_questions_path
      expect(response.body).to have_tag('.question-index.list-item', count: 2)
    end

    it '終了した質問を表示' do
      get closed_questions_path
      expect(response.body).to have_tag('.question-index.list-item', count: 1)
    end
  end

  describe 'question creation' do
    it '質問作成ページを表示' do
      get new_question_path
      expect(response).to have_http_status(200)
    end

    context '質問作成' do
      it '回答依頼をしない質問' do
        params = {title: SecureRandom.hex(4), markdown: SecureRandom.hex(4)}
        post new_question_path, questions: params
        expect(response).to have_http_status(201)
        expect(Question.find(json[:id]).title).to eq(params[:title])
      end

      it '回答依頼をする質問' do
        params = {
          title: SecureRandom.hex(4),
          markdown: SecureRandom.hex(4),
          assigned: [User.second.login]
        }
        post new_question_path, questions: params
        expect(response).to have_http_status(201)
        expect(Question.find(json[:id]).title).to eq(params[:title])
        expect(Question.find(json[:id]).users).to include(User.second)
      end

      it '作成失敗でエラーメッセージが返る' do
        post new_question_path, questions: {title: '', markdown: ''}
        expect(response).to have_http_status(400)
        expect(json[:errors]).to be_truthy
      end
    end
  end

  describe 'display question' do

  end

  describe 'question response' do
    let(:question) do
      q = create(:question, :valid, user: User.second)
      q.assign!(User.first, User.third, User.fourth)
      q
    end

    let(:no_assigned_question) do
      q = create(:question, :valid, user: User.second)
      q.assign!(User.third, User.fourth)
      q
    end

    context '力になれません' do
      it '反応済みが増える' do
        expect {
          patch sorry_question_path(question.id)
          expect(response).to have_http_status(201)
        }.to change(question, :responded_count).by(1)
      end

      it 'おねがいされていないとエラー' do
        patch sorry_question_path(no_assigned_question.id)
        expect(response).to have_http_status(400)
      end
    end

    context 'ちょっとまって' do
      it '反応済みはかわらない' do
        expect {
          patch wait_question_path(question.id)
          expect(response).to have_http_status(201)
        }.not_to change(question, :responded_count)
      end

      it 'おねがいされていないとエラー' do
        patch wait_question_path(no_assigned_question.id)
        expect(response).to have_http_status(400)
      end
    end

    context '知っている人を教える' do
      it '反応済みが増える' do
        expect {
          patch assign_question_path(question.id), questions: {assigned: [User.fifth.login]}
          expect(response).to have_http_status(201)
        }.to change(question, :responded_count).by(1)
      end

      it '回答者が増える' do
        expect {
          patch assign_question_path(question.id), questions: {assigned: [User.fifth.login]}
          expect(response).to have_http_status(201)
        }.to change(question, :assigned_count).by(1)

        expect(question.users).to include(User.fifth)
      end

      it '人が空だとエラー' do
        patch assign_question_path(question.id), questions: {assigned: []}
        expect(response).to have_http_status(400)
      end

      it '存在しないloginだとエラー' do
        patch assign_question_path(question.id), questions: {assigned: ['not']}
        expect(response).to have_http_status(400)
      end
    end

    context '回答する' do
      it '反応済みが増える' do
        expect {
          patch answer_question_path(question.id), questions: {markdown: '# new comment'}
          expect(response).to have_http_status(201)
        }.to change(question, :responded_count).by(1)
      end

      it '回答が増える' do
        expect {
          patch answer_question_path(question.id), questions: {markdown: '# new comment'}
          expect(response).to have_http_status(201)
        }.to change(question.comments.where { user == User.first }, :size).by(1)
      end

      it '不正なパラメーターでエラー' do
        expect {
          patch answer_question_path(question.id), questions: {markdown: ''}
          expect(response).to have_http_status(400)
        }.not_to change(question, :responded_count)
      end
    end

    context 'コメントにリプライする' do
      it '反応済みが増える' do
        expect {
          post reply_question_path(question_id: question.id, comment_id: question.root.id), questions: {markdown: '# new comment'}
          expect(response).to have_http_status(201)
        }.to change(question.comments.where { user == User.first }, :size).by(1)
      end

      it '不正なパラメーターでエラー' do
        expect {
          post reply_question_path(question_id: question.id, comment_id: question.root.id), questions: {markdown: ''}
          expect(response).to have_http_status(400)
        }.not_to change(question.comments.where { user == User.first }, :size)
      end
    end

    context '質問を終わらせる' do
      it 'ステータスが変わる' do
        question = create(:question, :valid)
        patch finish_question_path(question_id: question.id)
        expect(response).to have_http_status(201)
        question.reload
        expect(question.closed?).to be_truthy
      end

      it 'オーナーでないとエラー' do
        patch finish_question_path(question_id: question.id)
        expect(response).to have_http_status(400)
      end
    end
  end
end
