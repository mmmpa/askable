require 'capybara_helper'

feature 'グループ作成' do
  before :each do |ex|
    ready_ss(ex)
    authlogic_login(User.first)
  end

  let(:name) { SecureRandom.hex(4) }
  let(:description) { SecureRandom.hex(4) }

  scenario '作成' do
    visit new_group_path
    take_ss('無入力')

    find('.new-group input[name="name"]').set(name)
    find('.new-group input[name="description"]').set(description)

    take_ss('入力済み')

    find('.new-group button').click

    take_ss('送信')

    take_ss('作成完了', 1)
    find('.group-portal.name', text: name)
  end

  scenario 'エラー' do
    visit new_group_path
    take_ss('無入力')

    find('.new-group button').click

    take_ss('無入力エラー', 1)

    find('.new-group input[name="name"]').set(name)
    find('.new-group input[name="description"]').set(description)

    take_ss('入力済み')

    find('.new-group button').click

    take_ss('送信')

    take_ss('作成完了', 1)
    find('.group-portal.name', text: name)
  end

end
