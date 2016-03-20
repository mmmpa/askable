require 'capybara_helper'

feature '招待に対するリアクション' do
  before :each do |ex|
    ready_ss(ex)
    authlogic_login(User.first)
  end

  let(:group) { create(:group, :valid, user: User.second) }
  let(:group2) { create(:group, :valid, user: User.second) }

  before :each do
    group.add_by!(User.second, User.first)
    group2.add_by!(User.second, User.first)
  end

  scenario '招待の表示' do
    visit portal_path
    take_ss('全て表示')
    expect(all('.invitation .message').size).to eq(2)
  end

  scenario '招待を受ける' do
    visit portal_path
    take_ss('全て表示')

    all('.invitation .submit').last.click
    take_ss('送信')

    take_ss('受け入れ完了', 1)

    visit group_path(group)
    take_ss('グループを表示できる')
    expect(page.current_path).to eq(group_path(group))
  end

  scenario '拒絶' do
    visit portal_path
    take_ss('全て表示')

    all('.invitation .reject').last.click
    take_ss('送信')

    take_ss('拒絶完了', 1)

    visit group_path(group)
    take_ss('グループを表示できない')
    expect(page.current_path).to eq(portal_path)
  end

  scenario 'ブロック' do
    visit portal_path
    take_ss('全て表示')

    all('.invitation .block').last.click
    take_ss('送信')

    take_ss('ブロック完了', 1)

    visit group_path(group)
    take_ss('グループを表示できない')
    expect(page.current_path).to eq(portal_path)
    expect { group.add_by!(User.second, User.first) }.to raise_error(Group::AlreadyInvited)
  end

end
