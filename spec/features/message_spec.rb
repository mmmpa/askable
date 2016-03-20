require 'capybara_helper'

feature 'メッセージ' do
  before :each do |ex|
    ready_ss(ex)
    authlogic_login(User.first)
  end

  let(:title) { SecureRandom.hex(4) }
  let(:markdown) { SecureRandom.hex(4) }
  let(:message) { Message.send_to_by!(User.second, User.first, {title: title, markdown: markdown}) }

  let(:system_title) { SecureRandom.hex(4) }
  let(:system_markdown) { SecureRandom.hex(4) }
  let(:system_message) { Message.send_to_by!(User.system, User.first, {title: title, markdown: markdown}) }

  let(:message_others) { Message.send_to_by!(User.second, User.third, {title: title, markdown: markdown}) }

  feature 'メッセージの表示' do
    scenario '自分のは表示できる' do
      visit message_path(message)
      take_ss('表示')
      expect(page.current_path).to eq(message_path(message))
    end

    scenario 'システムからのメッセージにはアラートをつける' do
      visit message_path(system_message)
      take_ss('表示')
      find('.message-box.from-system')
      expect(page.current_path).to eq(message_path(system_message))
    end

    scenario '他人宛は表示できない' do
      visit message_path(message_others)
      take_ss('表示できない')
      expect(page.current_path).not_to eq(message_path(message_others))
    end
  end

  scenario 'メッセージの削除' do
    visit message_path(message)
    take_ss('表示')

    find('button.dispose').click
    take_ss('送信')

    take_ss('削除ずみ', 1)

    visit message_path(message)
    expect(page.current_path).not_to eq(message_path(message))
  end
end
