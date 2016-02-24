require 'rails_helper'

RSpec.describe "Users", type: :request do
  let(:json) {
    parsed = JSON.parse(response.body)
    Array === parsed ? {array: parsed}.deep_symbolize_keys![:array] : parsed.deep_symbolize_keys!
  }

  describe 'user creation' do
    it 'ユーザー新規作成フォームの表示' do
      get welcome_new_user_path
      expect(response).to have_http_status(200)
    end

    context 'ユーザー作成' do
      it '作成成功でユーザーデータが返る' do
        params = attributes_for(:user, :valid);
        post welcome_new_user_path, users: params
        expect(response).to have_http_status(200)
        expect(json[:login]).to eq(params[:login])
      end

      it '作成失敗でエラーメッセージが返る' do
        post welcome_new_user_path, users: attributes_for(:user, :valid, login: '')
        expect(response).to have_http_status(200)
        pp json
        expect(json[:errors]).to be_truthy
      end
    end
  end
end
