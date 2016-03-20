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
end