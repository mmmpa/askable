require 'capybara_helper'

feature 'クエスチョン投稿' do
  before :each do |ex|
    ready_ss(ex)
    authlogic_login(User.first)
  end

  let!(:question_size) { Question.count }
  let!(:ask_size) { AskUser.count }
  let(:group) { create(:group, :valid) }

  before :each do
    [User.second, User.third, User.fourth, User.fifth].each do |user|
      group.add_by!(User.first, user)
    end
    GroupUser.all.each(&:accepted!)
  end

  scenario 'アサインなし投稿' do
    visit new_question_path(group_id: group.id)
    take_ss('無入力')

    find('.new-question input[name="title"]').set(SecureRandom.hex(4))
    find('.new-question .CodeMirror').send_keys(SecureRandom.hex(4))

    take_ss('入力済み')

    find('.new-question button').click

    take_ss('送信')

    sleep 1
    expect(Question.count).to eq(question_size + 1)
    expect(AskUser.count).to eq(ask_size)
    take_ss('投稿完了')
  end

  scenario 'アサインあり投稿' do
    visit new_question_path(group_id: group.id)
    take_ss('無入力')

    find('.new-question input[name="title"]').set(SecureRandom.hex(4))
    find('.new-question .CodeMirror').send_keys(SecureRandom.hex(4))
    all('.new-question .group-member input').first.click

    take_ss('入力済み')

    find('.new-question button').click

    take_ss('送信')

    sleep 1
    expect(Question.count).to eq(question_size + 1)
    expect(AskUser.count).to eq(ask_size + 1)
    take_ss('投稿完了')
  end

  scenario '投稿エラー' do
    visit new_question_path(group_id: group.id)
    take_ss('無入力')

    find('.new-question button').click

    sleep 1
    take_ss('無入力エラー')

    find('.new-question input[name="title"]').set(SecureRandom.hex(4))
    find('.new-question .CodeMirror').send_keys(SecureRandom.hex(4))

    take_ss('入力済み')

    find('.new-question button').click

    take_ss('送信')

    sleep 1
    expect(Question.count).to eq(question_size + 1)
    expect(AskUser.count).to eq(ask_size)
    take_ss('投稿完了')
  end
end

def generate_email
  "mmmpa.mmmpa+#{SecureRandom.hex(4)}@gmail.com"
end