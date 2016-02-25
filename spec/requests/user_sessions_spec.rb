require 'rails_helper'

RSpec.describe "UserSessions", type: :request do
  describe `user login` do
    it 'ログインフォームの表示' do
      get log_in_path
      expect(response).to have_http_status(200)
    end

    context 'ログイン' do
      it 'ログイン成功で201' do
        post log_in_path, user_sessions: {login: User.first.login, password: 'a' * 8}
        expect(response).to have_http_status(201)
      end

      it 'ログイン失敗で401' do
        post log_in_path, user_sessions: {login: User.second.login, password: 'a' * 8}
        expect(response).to have_http_status(401)
      end
    end
  end
end
