require 'rails_helper'

RSpec.describe "Portals", type: :request do
  before :each do
    authlogic_login(User.first)
  end

  describe 'show' do
    it '表示' do
      get portal_path
      expect(response).to have_http_status(200)
    end
  end
end
