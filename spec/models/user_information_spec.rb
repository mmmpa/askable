require 'rails_helper'

RSpec.describe UserInformation, type: :model do
  before :each do
    Message.send_to_by!(User.system, User.first, {title: 'message title', markdown: '# message'})
    Message.send_to_by!(User.system, User.first, {title: 'message title2', markdown: '# message2'})

    Group.first_group.add_by!(User.system, User.first)
  end

  let(:information) { UserInformation.(User.first) }

  describe 'リストを得る' do
    it 'リストはアイテムで構成' do
      expect(information.information.first).to be_a(UserInformation::Item)
    end

    it '初期招待メールとメッセージのリストを得る' do
      expect(information.information.size).to eq(3)
    end

    it '招待のリストを得る' do
      expect(information.invitations.size).to eq(1)
    end

    it 'メッセージのリストを得る' do
      expect(information.messages.size).to eq(2)
    end
  end

  describe 'リスト用にフォーマットを統一する' do
    it do
      expect(information.convert(Message.first)).to be_a(UserInformation::Item)
    end

    it do
      expect(information.convert(GroupUser.first)).to be_a(UserInformation::Item)
    end

    it do
      expect(information.convert(Comment.first)).to be_nil
    end
  end
end
