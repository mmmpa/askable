require 'rails_helper'

RSpec.describe Group, type: :model do
  describe 'factory' do
    it { expect(create(:group, :valid)).to be_a(Group) }
  end

  let(:group) { create(:group, :valid) }
  let(:after_g) { Group.find(group.id) }
  let(:group2) { create(:group, :valid, user: User.second) }

  describe 'メンバー' do
    before :each do
      group.add_by!(User.first, User.second)
      group.add_by!(User.first, User.all[6])
      group2.add_by!(User.second, User.third)
    end

    context 'メンバーリスト' do
      it 'オーナーを含んだ全員' do
        expect(group.all_members).to match_array([User.first, User.second, User.all[6]])
      end
    end

    context '追加' do
      it 'メンバーであれば追加できる' do
        expect(group.add_by!(User.second, User.fourth)).to be_truthy
        expect(after_g.users.size).to eq(3)
      end

      it 'メンバーでなければ追加できない' do
        expect { group.add_by!(User.fourth, User.fourth) }.to raise_error(Group::NotMember)
        expect(after_g.users.size).to eq(2)
      end
    end

    context '削除' do
      it '本人であれば削除できる' do
        expect(group.remove_by!(User.second, User.second)).to be_truthy
        expect(after_g.users.size).to eq(1)
      end

      it 'オーナーであれば削除できる' do
        expect(group.remove_by!(User.first, User.second)).to be_truthy
        expect(after_g.users.size).to eq(1)
      end

      it 'メンバーは削除できない' do
        expect { group.remove_by!(User.all[6], User.second) }.to raise_error(Group::NotOwner)
        expect(after_g.users.size).to eq(2)
      end

      it 'メンバー以外も削除できない' do
        expect { group.remove_by!(User.third, User.second) }.to raise_error(Group::NotOwner)
        expect(after_g.users.size).to eq(2)
      end
    end

    context '編集' do
      let(:new_description) { SecureRandom.hex(4) }

      it 'オーナーであれば編集できる' do
        expect(group.update_by!(User.first, {description: new_description})).to be_truthy
        expect(after_g.description).to eq(new_description)
      end

      it 'メンバーは編集できない' do
        expect { group.update_by!(User.second, {description: new_description}) }.to raise_error(Group::NotOwner)
        expect(after_g.description).to eq(group.description)
      end

      it 'メンバー以外も編集できない' do
        expect { group.update_by!(User.third, {description: new_description}) }.to raise_error(Group::NotOwner)
        expect(after_g.description).to eq(group.description)
      end
    end
  end
end
