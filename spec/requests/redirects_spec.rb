require 'rails_helper'

RSpec.describe "Redirects", type: :request do
  describe 'redirect' do
    it '非ログイン時はログイン画面にリダイレクト' do
      get portal_path
      expect(response).to redirect_to(log_in_path)
    end

    it 'ログイン時はそのまま' do
      authlogic_login(User.first)
      get portal_path
      expect(response).to have_http_status(200)
    end
  end
end
