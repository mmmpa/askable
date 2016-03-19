require 'rails_helper'

RSpec.describe "Users", type: :request do
  before :each do
    authlogic_login(User.first)
  end

  describe 'edit' do
    it '情報の表示' do
      get edit_user_path
      expect(response).to have_http_status(200)
      expect(response.body).to include(User.first.login)
    end
  end

  describe 'update' do
    it '情報の編集の成功' do
      patch edit_user_path, users: {login: 'abcd'}
      expect(response).to have_http_status(201)
      expect(User.first.login).to eq('abcd')
    end

    it 'エラー' do
      patch edit_user_path, users: {longin: 'abcd', name: ''}
      expect(response).to have_http_status(400)
      expect(User.first.login).not_to eq('abcd')
    end
  end

  describe 'update_password' do
    it 'パスワードの変更に成功' do
      patch change_password_path, users: {password_now: 'a' * 8, password: 'b' * 8}
      expect(response).to have_http_status(201)
      expect(User.first.valid_password?('b' * 8)).to be_truthy
    end

    it '現在のパスワード間違いでエラー' do
      patch change_password_path, users: {password_now: 'a' * 7, password: 'b' * 8}
      expect(response).to have_http_status(400)
      expect(User.first.valid_password?('b' * 8)).to be_falsey
    end

    it '現在のパスワードなしでエラー' do
      patch change_password_path, users: {password: 'b' * 8}
      expect(response).to have_http_status(400)
      expect(User.first.valid_password?('b' * 8)).to be_falsey
    end
  end

  describe 'destroy' do
    let(:target) { create(:user, :valid) }
    before :each do
      authlogic_login(target)
    end

    it '削除' do
      expect {
        delete edit_user_path
      }.to change(User, :count).by(-1)
      expect(response).to have_http_status(201)
    end

    it 'なんらかの失敗' do
      allow_any_instance_of(User).to receive(:destroy!){
        raise raise ActiveRecord::RecordNotDestroyed, target
      }
      expect {
        delete edit_user_path
      }.not_to change(User, :count)
      expect(response).to have_http_status(400)
    end
  end
end
