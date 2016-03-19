require 'rails_helper'

RSpec.describe "Groups", type: :request do
  before :each do
    authlogic_login(User.first)
  end

  let(:group1) { create(:group, :valid, user: User.first) }
  let(:group2) { create(:group, :valid, user: User.second) }
  let(:group3) { create(:group, :valid, user: User.second) }
  let(:group4) { create(:group, :valid, user: User.second) }

  before :each do
    group1.add_by!(User.first, User.fourth)

    group2.add_by!(User.second, User.first)
    User.first.invitations.last.accept!
    group2.add_by!(User.second, User.third)
    User.third.invitations.last.accept!
    group3.add_by!(User.second, User.first)
  end

  describe 'show' do
    it '自分のグループは表示できる' do
      get group_path(group1)
      expect(response).to have_http_status(200)
    end

    it '自分が参加しているグループは表示できる' do
      get group_path(group2)
      expect(response).to have_http_status(200)
    end

    it '招待を承認しないと表示できない' do
      get group_path(group3)
      expect(response).to have_http_status(301)
    end

    it '自分がかかわらないグループは表示できない' do
      get group_path(group4)
      expect(response).to have_http_status(301)
    end
  end

  describe 'new' do
    it 'フォームを表示' do
      get new_group_path
      expect(response).to have_http_status(200)
    end
  end

  describe 'create' do
    it 'validで作成' do
      expect {
        post new_group_path, groups: attributes_for(:group, :valid)
      }.to change(Group, :count).by(1)
      expect(response).to have_http_status(201)
      expect(Group.last.user).to eq(User.first)
    end

    it 'invalidでエラー' do
      expect {
        post new_group_path, groups: attributes_for(:group, :valid, name: '')
      }.not_to change(Group, :count)
      expect(response).to have_http_status(400)
    end
  end

  describe 'invite' do
    context '自分がオーナーのグループでは' do
      it '招待できる' do
        expect {
          post new_invitation_path(group_id: group1.id), invitations: {login: User.fifth.login}
        }.to change(User.fifth.invitations, :count).by(1)
        expect(response).to have_http_status(201)
      end

      it '招待済みのユーザーは招待できない' do
        expect {
          post new_invitation_path(group_id: group1.id), invitations: {login: User.fourth.login}
        }.not_to change(User.fourth.invitations, :count)
        expect(response).to have_http_status(403)
      end

      it '存在しないユーザーは招待できない' do
        expect {
          post new_invitation_path(group_id: group1.id), invitations: {login: 'not exist'}
        }.not_to change(User.fourth.invitations, :count)
        expect(response).to have_http_status(404)
      end
    end

    it '他人がオーナーのグループでは招待できない' do
      expect {
        post new_invitation_path(group_id: group2.id), invitations: {login: User.fifth.login}
      }.to change(User.third.invitations, :count).by(0)
      expect(response).to have_http_status(403)
    end
  end

  describe 'destroy' do
    it '自分のグループを破棄' do
      expect {
        delete group_path(group_id: group1.id)
      }.to change(Group, :count).by(-1)
    end

    it '参加中のグループから脱退' do
      expect {
        delete group_path(group_id: group2.id)
      }.not_to change(Group, :count)
      expect(response).to have_http_status(201)
      expect(group2.users(true)).not_to include(User.first)
    end

    it '関わりのないグループには何もできない' do
      expect {
        delete group_path(group4)
      }.to raise_error(ActionController::RoutingError)
    end
  end
end
