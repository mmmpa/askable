require 'rails_helper'

RSpec.describe "Invitations", type: :request do
  before :each do
    authlogic_login(User.first)
  end

  let(:group) { create(:group, :valid, user: User.second) }

  before :each do
    group.add_by!(User.second, User.first)
    group.add_by!(User.second, User.third)
  end

  describe '招待される' do
    it '自分宛の招待では成功する' do
      expect {
        patch accept_invitation_path(User.first.invitations.last)
      }.to change(User.first.invitations, :size).by(-1)
      expect(response).to have_http_status(201)
      expect(User.first.groups).to include(group)
    end

    it '他人宛は処理できない' do
      expect {
        patch accept_invitation_path(User.third.invitations.last)
      }.not_to change(User.third.invitations, :size)
      expect(response).to have_http_status(404)
    end
  end

  describe '拒否する' do
    it '自分宛の招待では成功する' do
      expect {
        patch reject_invitation_path(User.first.invitations.last)
      }.to change(User.first.invitations, :size).by(-1)
      expect(response).to have_http_status(201)
      expect(User.first.groups).not_to include(group)
    end

    it '他人宛は処理できない' do
      expect {
        patch reject_invitation_path(User.third.invitations.last)
      }.not_to change(User.third.invitations, :size)
      expect(response).to have_http_status(404)
    end
  end

  describe 'ブロックする' do
    it '自分宛の招待では成功する' do
      expect {
        patch block_invitation_path(User.first.invitations.last)
      }.to change(User.first.invitations, :size).by(-1)
      expect(response).to have_http_status(201)
      expect(User.first.groups).not_to include(group)
    end

    it '他人宛は処理できない' do
      expect {
        patch block_invitation_path(User.third.invitations.last)
      }.not_to change(User.third.invitations, :size)
      expect(response).to have_http_status(404)
    end
  end
end
