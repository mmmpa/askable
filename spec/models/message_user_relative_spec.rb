require 'rails_helper'

RSpec.describe MessageUserRelative, type: :model do
  before :each do
    Message.send_to_by!(User.system, User.first, {title: 'title', markdown: 'message'})
    Message.send_to_by!(User.system, User.first, {title: 'title', markdown: 'message'})
    Message.send_to_by!(User.first, User.second, {title: 'title', markdown: 'message'})
  end

  describe 'メッセージリスト' do
    it '自分宛' do
      expect(User.first.received_messages.size).to eq(2)
    end

    it '自分が出した' do
      expect(User.first.sent_messages.size).to eq(1)
    end

    it '自分関係全て' do
      expect(User.first.messages.size).to eq(3)
    end
  end

  describe 'ユーザー削除時' do
    let!(:messages) { User.first.received_messages }
    let!(:sent_messages) { User.first.sent_messages }

    before :each do
      User.first.destroy!
    end

    it '自分宛のメッセージは受取人が削除済みユーザーとなる' do
      messages.each do |message|
        expect(message.user).to eq(User.deleted)
      end
    end

    it '自分宛のメッセージは送り主が削除済みユーザーとなる' do
      sent_messages.each do |message|
        expect(message.user).to eq(User.deleted)
      end
    end
  end
end