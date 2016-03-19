require 'capybara_helper'

feature 'グループ管理' do
  before :each do |ex|
    ready_ss(ex)
    authlogic_login(User.first)
  end

  let(:group) { create(:group, :valid) }

  feature 'グループ解散' do
    scenario '解散' do
      visit group_path(group)
      take_ss('無入力')

      find('.disposer input').set(group.name)

      take_ss('入力済み')

      find('.disposer button').click
      take_ss('送信')

      take_ss('削除完了', 1)


      expect { group.reload }.to raise_error(ActiveRecord::RecordNotFound)
    end

    scenario 'エラー' do
      visit group_path(group)
      take_ss('無入力')

      find('.disposer button').click
      take_ss('入力前はクリックできない', 1)
    end
  end

  feature 'メンバーを招待' do
    scenario '招待' do
      visit group_path(group)
      take_ss('無入力')


      find('.invitation input[name="login"]').set(User.second.login)

      take_ss('入力済み')

      find('.invitation button').click

      take_ss('送信')

      take_ss('招待完了', 1)
      expect(User.second.invitations.last.group).to eq(group)
      User.second.invitations.last.accept!

      visit group_path(group)
      take_ss('メンバーが参加')
      find('.group-portal.member', text: User.second.name)
    end

    scenario 'エラー' do
      visit group_path(group)
      take_ss('無入力')

      find('.invitation button').click

      take_ss('無入力エラー', 1)

      find('.invitation input[name="login"]').set('not exist')
      find('.invitation button').click

      take_ss('不在エラー', 1)

      find('.invitation input[name="login"]').set(User.second.login)

      take_ss('入力済み')

      find('.invitation button').click

      take_ss('送信')

      take_ss('招待完了', 1)
      expect(User.second.invitations.last.group).to eq(group)
      User.second.invitations.last.accept!

      visit group_path(group)
      take_ss('メンバーが参加')
      find('.group-portal.member', text: User.second.name)
    end
  end

end
