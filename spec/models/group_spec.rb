require 'rails_helper'

RSpec.describe Group, type: :model do
  describe 'factory' do
    it { expect(create(:group, :valid)).to be_a(Group) }
  end

  let(:group) { create(:group, :valid) }
  let(:after_g) { Group.find(group.id) }
  let(:group2) { create(:group, :valid, user: User.second) }
  let(:after_g2) { Group.find(group2.id) }

  before :each do
    group.add_by!(User.first, User.second)
    group.add_by!(User.first, User.seventh)
    group2.add_by!(User.second, User.third)

    User.second.invitations.each(&:accepted!)
    User.third.invitations.each(&:accepted!)
    User.seventh.invitations.each(&:accepted!)
  end

  describe 'カウントキャッシュ関係' do
    context 'index経由でSQLがカウントする' do
      let(:indexed) { Group.index.find(group.id) }

      it 'member_count' do
        expect(indexed.member_count).to eq(3)
      end

      it 'opened_count' do
        expect(indexed.opened_count).to eq(0)
      end
    end

    context 'index時以外はARがカウントする' do
      let(:indexed) { Group.find(group.id) }

      it 'member_count' do
        expect(indexed.member_count).to eq(3)
      end

      it 'opened_count' do
        expect(indexed.opened_count).to eq(0)
      end
    end
  end

  describe '作成' do
    let(:created) { Group.create_by!(User.first, {name: 'name', description: 'description'}) }

    it do
      expect(created).to be_a(Group)
    end

    it do
      expect(created.user).to eq(User.first)
    end
  end

  describe '解散' do
    let(:created) { Group.create_by!(User.first, {name: 'name', description: 'description'}) }

    context 'オーナーは解散できる' do
      it do
        expect(created.dispose_by!(User.first)).to be_a(Group)
      end

      it do
        created.dispose_by!(User.first)
        expect(created.destroyed?).to be_truthy
      end
    end

    context 'メンバーの場合、メンバーが脱退する' do
      before :each do
        created.add_by!(User.first, User.second)
        User.second.invitations.last.accept!
        created.dispose_by!(User.second)
      end

      it do
        expect(created.member?(User.second)).to be_falsey
      end

      it do
        expect(created.destroyed?).to be_falsey
      end
    end
  end

  describe '問題' do
    context '追加' do
      it 'メンバーが作った質問は追加できる' do
        q = create(:question, :valid, user: User.second)
        expect(group.add_question(q)).to be_truthy
        expect(after_g.questions.size).to eq(1)
      end

      it 'メンバーでなければ追加できない' do
        q = create(:question, :valid, user: User.third)
        expect { group.add_question(q) }.to raise_error(Group::NotMember)
        expect(after_g.questions.size).to eq(0)
      end
    end

    context 'このグループの問題か否か' do
      let(:created) { Group.create_by!(User.first, {name: 'name', description: 'description'}) }

      it do
        q = create(:question, :valid, user: User.first)

        expect(created.mine?(q)).to be_falsey
        expect { created.mine_or_die!(q) }.to raise_error(Group::NotMine)
      end

      it do
        q = create(:question, :valid, user: User.first, group: created)

        expect(created.mine?(q)).to be_truthy
        expect(created.mine_or_die!(q)).to be_falsey
      end
    end
  end

  describe 'メンバー' do
    let!(:member_count) { group.all_members.size }

    context 'メンバーリスト' do
      it 'オーナーを含んだ全員' do
        expect(group.all_members).to match_array([User.first, User.second, User.seventh])
      end
    end

    context '招待' do
      it 'メンバーであれば招待できる' do
        expect(group.add_by!(User.second, User.fourth)).to be_truthy
        expect(after_g.users.size).to eq(member_count + 1)
      end

      it 'メンバーでなければ招待できない' do
        expect { group.add_by!(User.fourth, User.fourth) }.to raise_error(Group::NotMember)
        expect(after_g.users.size).to eq(member_count)
      end

      it '招待済みだと招待できない' do
        group2.add_by!(User.second, User.fifth)
        expect { group2.add_by!(User.second, User.fifth) }.to raise_error(Group::AlreadyInvited)
      end

      it 'ブロックされていると招待できない' do
        group2.add_by!(User.second, User.fifth)
        User.fifth.invitations.first.blocked!
        expect { group2.add_by!(User.second, User.fifth) }.to raise_error(Group::AlreadyInvited)
      end
    end

    context '承認' do
      it '承認すればメンバーになる' do
        group2.add_by!(User.second, User.fifth)
        User.fifth.invitations.first.accepted!
        expect(after_g2.member?(User.fifth)).to be_truthy
      end

      it '承認するまでメンバーではない' do
        group2.add_by!(User.second, User.fifth)
        expect(after_g.member?(User.fifth)).to be_falsey
      end
    end

    context '削除' do
      it '本人であれば削除できる' do
        expect(group.remove_by!(User.second, User.second)).to be_truthy
        expect(after_g.users.size).to eq(member_count - 1)
      end

      it 'オーナーであれば削除できる' do
        expect(group.remove_by!(User.first, User.second)).to be_truthy
        expect(after_g.users.size).to eq(member_count - 1)
      end

      it 'オーナーは削除できない' do
        expect { group.remove_by!(User.first, User.first) }.to raise_error(Group::IsOwner)
        expect(after_g.users.size).to eq(member_count)
      end

      it 'メンバーは削除できない' do
        expect { group.remove_by!(User.seventh, User.second) }.to raise_error(Group::NotOwner)
        expect(after_g.users.size).to eq(member_count)
      end

      it 'メンバー以外も削除できない' do
        expect { group.remove_by!(User.third, User.second) }.to raise_error(Group::NotOwner)
        expect(after_g.users.size).to eq(member_count)
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
