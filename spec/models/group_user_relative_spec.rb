require 'rails_helper'

RSpec.describe GroupUserRelative, type: :model do
  before :all do
    g1 = create(:group, :valid)
    g2 = create(:group, :valid)
    g3 = create(:group, :valid)
    g4 = create(:group, :valid)
    g5 = create(:group, :valid)
    g6 = create(:group, :valid)
    g7 = create(:group, :valid, user: User.third)
    g8 = create(:group, :valid, user: User.third)
    g9 = create(:group, :valid, user: User.third)

    g1.add_by!(User.first, User.second)
    g2.add_by!(User.first, User.second)
    g3.add_by!(User.first, User.second)
    g4.add_by!(User.first, User.second)
    g5.add_by!(User.first, User.second)
    g6.add_by!(User.first, User.second)

    g7.add_by!(User.third, User.first)
    g8.add_by!(User.third, User.first)
    g9.add_by!(User.third, User.first)

    User.second.invitations.first.accepted!
    User.second.invitations.first.accepted!
    User.second.invitations.first.blocked!

    User.first.invitations.each(&:accepted!)

    @g = [nil, g1, g2, g3, g4, g5, g6, g7, g8, g9]
  end

  after :all do
    Group.destroy_all
  end

  it do
    expect(User.second.groups.pluck(:id)).to match_array([@g[1].id, @g[2].id])
  end

  it do
    expect(User.second.blocked_groups.map { |g| g.group.id }).to match_array([@g[3].id])
  end

  it do
    expect(User.second.invitations.map { |g| g.group.id }).to match_array([@g[4].id, @g[5].id, @g[6].id])
  end

  it 'groupsには自分がオーナーのグループも含む' do
    expect(User.first.groups.pluck(:id)).to eq(@g.compact.map(&:id))
  end
end
