require 'rails_helper'

RSpec.describe GroupKeeper, type: :model do
  let(:group) { create(:group, :valid) }
  let(:after_g) { Group.find(group.id) }
  let(:group2) { create(:group, :valid, user: User.second) }
  let(:after_g2) { Group.find(group2.id) }
  let(:q1) { create(:question, :valid, user: User.second) }
  let(:q2) { create(:question, :valid, user: User.second) }

  before :each do
    group.add_by!(User.first, User.second)
    group.add_by!(User.first, User.all[6])
    group2.add_by!(User.second, User.third)

    User.second.invitations.each(&:accepted!)
    User.third.invitations.each(&:accepted!)
    User.all[6].invitations.each(&:accepted!)

    group.add_question(q1)
    group2.add_question(q2)
  end

  describe 'インスタンスの作成' do
    it 'グループのメンバーだと作成できる' do
      expect(GroupKeeper.(group: group, user: User.second)).to be_a(GroupKeeper)
    end

    it 'グループのメンバーでないとエラー' do
      expect { GroupKeeper.(group: group, user: User.third) }.to raise_error(Group::NotMember)
    end

    it 'グループがないとエラー' do
      expect { GroupKeeper.(group: nil, user: User.third) }.to raise_error(GroupKeeper::GroupRequired)
    end

    it 'メンバーがないとエラー' do
      expect { GroupKeeper.(group: group, user: nil) }.to raise_error(GroupKeeper::UserRequired)
    end

    context '質問がある場合' do
      it 'グループの質問だと作成できる' do
        expect(GroupKeeper.(group: group, user: User.second, question: q1)).to be_a(GroupKeeper)
      end

      it 'グループの質問でないとエラー' do
        expect { GroupKeeper.(group: group, user: User.second, question: q2) }.to raise_error(Group::NotMine)
      end
    end
  end

  describe 'グループの質問作成' do
    let(:keeper) { GroupKeeper.(group: group, user: User.second) }

    it '作成' do
      keeper.create_question!({title: 'title', markdown: '# markdown'})
      expect(group.questions.size).to eq(2)
      expect(User.second.questions.size).to eq(3)
    end
  end

  describe 'グループの質問への反応' do
    let(:keeper) { GroupKeeper.(group: group, user: User.second, question: question) }

    it '知っている人を紹介' do

    end

    it '力になれません'
    it '返答する'
    it 'ちょっとまって'
    it 'リプライ'
  end
end
