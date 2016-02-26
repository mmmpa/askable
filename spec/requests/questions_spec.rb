require 'rails_helper'

RSpec.describe "Questions", type: :request do
  let(:json) {
    parsed = JSON.parse(response.body)
    Array === parsed ? {array: parsed}.deep_symbolize_keys![:array] : parsed.deep_symbolize_keys!
  }

  before :each do
    authlogic_login(User.first)
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
end
