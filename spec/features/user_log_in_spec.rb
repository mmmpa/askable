require 'capybara_helper'

feature 'ログイン' do
  before :each do |ex|
    ready_ss(ex)
  end

  scenario 'ログイン' do
    visit log_in_path
    take_ss('無入力')
    find('.user-log-in input[name="login"]').set(User.first.login)
    find('.user-log-in input[name="password"]').set('a' * 8)
    take_ss('入力済み')
    find('.user-log-in button').click
    take_ss('送信')
    find('.success-messages')
    take_ss('ログイン完了')
  end

  scenario 'ログイン（エラー）' do
    visit log_in_path
    take_ss('無入力')

    find('.user-log-in button').click
    sleep 1
    take_ss('無入力エラー')

    find('.user-log-in input[name="login"]').set(User.first.login)
    find('.user-log-in input[name="password"]').set('b')
    find('.user-log-in button').click

    sleep 1
    take_ss('パスワード相違エラー')

    find('.user-log-in input[name="login"]').set(User.first.login)
    find('.user-log-in input[name="password"]').set('a' * 8)
    find('.user-log-in button').click

    find('.success-messages')
    take_ss('ログイン成功')
  end
end

def generate_email
  "mmmpa.mmmpa+#{SecureRandom.hex(4)}@gmail.com"
end