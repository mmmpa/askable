require 'capybara_helper'

feature 'ユーザー登録' do
  before :each do |ex|
    ready_ss(ex)
  end

  scenario '新規ユーザー登録' do
    visit welcome_new_user_path
    take_ss('無入力')
    find('.user-register input[name="name"]').set(SecureRandom.hex(4))
    find('.user-register input[name="login"]').set(SecureRandom.hex(4))
    find('.user-register input[name="email"]').set(generate_email)
    find('.user-register input[name="password"]').set(SecureRandom.hex(4))
    take_ss('入力済み')
    find('.user-register button').click
    take_ss('送信')
    sleep 1
    find('.user-register .registered-body')
    take_ss('登録完了')
  end

  scenario '新規ユーザー登録（エラー）' do
    visit welcome_new_user_path
    take_ss('無入力')

    find('.user-register button').click

    sleep 1
    take_ss('無入寮エラー')
    find('.user-register .registering-body')
    expect(all('.error-messages').size).not_to eq(0)

    find('.user-register input[name="name"]').set(SecureRandom.hex(4))
    find('.user-register input[name="login"]').set(User.first.login)
    find('.user-register input[name="email"]').set(User.first.email)
    find('.user-register input[name="password"]').set('aa')
    take_ss('エラーを起こす入力')
    find('.user-register button').click

    sleep 1
    take_ss('一意エラー、短すぎるエラー')

    find('.user-register input[name="name"]').set(SecureRandom.hex(4))
    find('.user-register input[name="login"]').set(SecureRandom.hex(4))
    find('.user-register input[name="email"]').set(generate_email)
    find('.user-register input[name="password"]').set(SecureRandom.hex(4))
    take_ss('正常な入力済み')

    find('.user-register button').click
    take_ss('送信')
    sleep 1
    find('.user-register .registered-body')
    take_ss('登録完了')
  end
end

def generate_email
  "mmmpa.mmmpa+#{SecureRandom.hex(4)}@gmail.com"
end