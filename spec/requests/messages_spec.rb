require 'rails_helper'

RSpec.describe "Messages", type: :request do
  before :each do
    authlogic_login(User.first)
  end

  let! :messages do
    [
      Message.send_to_by!(User.system, User.first, {title: 'title1', markdown: 'message'}),
      Message.send_to_by!(User.system, User.first, {title: 'title2', markdown: 'message'}),
      Message.send_to_by!(User.first, User.second, {title: 'title3', markdown: 'message'}),
      Message.send_to_by!(User.system, User.second, {title: 'title2', markdown: 'message'})
    ]
  end

  describe 'index' do
    it '受診メッセージの表示' do
      get messages_path
      expect(response).to have_http_status(200)
      expect(response.body).to have_tag('.message-box.message-item', count: 2)
    end
  end

  describe 'show' do
    it '受診メッセージの表示' do
      get message_path(messages.first.id)
      expect(response).to have_http_status(200)
      expect(response.body).to include('title1')
    end

    it '他人宛は見れない' do
      get message_path(messages.last.id)
      expect(response).to have_http_status(404)
    end
  end

  describe 'destroy' do
    it '受診メッセージの削除' do
      delete message_path(messages.first.id)
      expect(response).to have_http_status(201)

      get message_path(messages.first.id)
      expect(response).to have_http_status(404)
    end

    it '他人宛は削除できない' do
      delete message_path(messages.last.id)
      expect(response).to have_http_status(400)
    end
  end
end
