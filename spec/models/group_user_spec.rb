require 'rails_helper'

RSpec.describe GroupUser, type: :model do
  it { expect(create(:group_user, :valid)).to be_a(GroupUser) }

  describe 'ステート変更メソッド名を動詞で' do
    let(:group_user) { create(:group_user, :valid) }

    it do
      group_user.accept!
      expect(group_user.accepted?).to be_truthy
    end

    it do
      group_user.reject!
      expect(group_user.destroyed?).to be_truthy
    end

    it do
      group_user.block!
      expect(group_user.blocked?).to be_truthy
    end
  end
end
