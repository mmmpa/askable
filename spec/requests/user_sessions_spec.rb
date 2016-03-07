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

    context 'ログアウト' do
      before :each do
        authlogic_login(User.first)
      end

      it 'ログアウト成功で201' do
        delete log_out_path
        expect(response).to have_http_status(201)
      end

      it 'ログアウト失敗でも201' do
        delete log_out_path
        delete log_out_path
        expect(response).to have_http_status(201)
      end
    end
  end
end
