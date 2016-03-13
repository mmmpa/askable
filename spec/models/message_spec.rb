require 'rails_helper'

RSpec.describe Message, type: :model do
  describe 'factory' do
    it { expect(create(:message, :valid)).to be_a(Message) }
  end

  describe 'validation' do
    let(:message) { build(:message, :valid) }

    it '書き手が必要' do
      message.owner = nil
      expect(message.valid?).to be_falsey
    end

    it '受けとりが必要' do
      message.user = nil
      expect(message.valid?).to be_falsey
    end

    it 'タイトルが必要' do
      message.title = nil
      expect(message.valid?).to be_falsey
    end

    it 'markdownが必要' do
      message.markdown = nil
      expect(message.valid?).to be_falsey
    end
  end

  describe 'メッセージリスト（送受信）' do
    let(:messages) { @messages }
    let(:message_count) { messages.size }

    before :all do
      messages = []
      messages.push Message.send_to_by!(User.first, User.second, attributes_for(:message, :valid, title: 'a'))
      messages.push Message.send_to_by!(User.second, User.first, attributes_for(:message, :valid, title: 'b'))
      messages.push Message.send_to_by!(User.first, User.second, attributes_for(:message, :valid, title: 'c'))
      messages.push Message.send_to_by!(User.second, User.first, attributes_for(:message, :valid, title: 'd'))
      messages.push Message.send_to_by!(User.first, User.second, attributes_for(:message, :valid, title: 'e'))

      @messages = messages
    end

    after :all do
      @messages.each(&:destroy)
    end

    it '全ての件数' do
      expect(message_count).to eq(5)
    end

    it '並び' do
      expect(User.first.messages.map(&:title)).to eq(%w(e d c b a))
    end
  end

  describe '送付' do
    let(:created) { Message.send_to_by!(User.first, User.second, attributes_for(:message, :valid)) }

    it '作成' do
      expect(created).to be_a(Message)
    end

    it '送り主' do
      expect(created.owner).to eq(User.first)
    end

    it '受け取り主' do
      expect(created.user).to eq(User.second)
    end
  end

  describe '廃棄' do
    let(:message) { create(:message, :valid) }
    let!(:owner) { message.owner }
    let!(:user) { message.user }

    context '双方が削除' do
      before :each do
        message.dispose!(owner)
        message.dispose!(user)
      end

      it '送り主のメッセージリストから消える' do
        expect(owner.sent_messages.include?(message)).to be_falsey
      end

      it '受け取り主のメッセージリストから消える' do
        expect(user.received_messages.include?(message)).to be_falsey
      end

      it 'メッセージが削除される' do
        expect(message.destroyed?).to be_truthy
      end
    end

    context '送り主だけが削除' do
      before :each do
        message.dispose!(owner)
      end

      it '送り主のメッセージリストから消える' do
        expect(owner.sent_messages.include?(message)).to be_falsey
      end

      it '受け取り主は参照できる' do
        expect(user.received_messages.include?(message)).to be_truthy
      end

      it 'メッセージは削除されない' do
        expect(message.destroyed?).to be_falsey
      end
    end

    context '受けとり主だけが削除' do
      before :each do
        message.dispose!(user)
      end

      it '受け取り主のメッセージリストから消える' do
        expect(user.received_messages.include?(message)).to be_falsey
      end

      it '送り主は参照できる' do
        expect(owner.sent_messages.include?(message)).to be_truthy
      end

      it 'メッセージは削除されない' do
        expect(message.destroyed?).to be_falsey
      end
    end
  end
end
