require 'rails_helper'

RSpec.describe GroupKeeper, type: :model do
  let(:group) { create(:group, :valid) }
  let(:after_g) { Group.find(group.id) }
  let(:group2) { create(:group, :valid, user: User.second) }
  let(:after_g2) { Group.find(group2.id) }
  let(:q1) { create(:question, :valid, user: User.second) }
  let(:q2) { create(:question, :valid, user: User.second) }

  before :all do
    Question.destroy_all
  end

  before :each do
    group.add_by!(User.first, User.second)
    group.add_by!(User.first, User.seventh)
    group.add_by!(User.first, User.fifth)
    group2.add_by!(User.second, User.third)

    User.second.invitations.each(&:accepted!)
    User.third.invitations.each(&:accepted!)
    User.fifth.invitations.each(&:accepted!)
    User.seventh.invitations.each(&:accepted!)

    group.add_question(q1)
    group2.add_question(q2)
  end

  describe 'インデックス' do
    let(:questions) { @questions }
    let(:g1) { @g1 }
    let(:g2) { @g2 }

    before :all do
      g1 = create(:group, :valid)
      g2 = create(:group, :valid, user: User.second)
      @g1 = g1
      @g2 = g2


      questions = []
      questions.push GroupKeeper.(group: g1, user: User.first).q.create!({title: 'title', markdown: '# markdown'})
      questions.push GroupKeeper.(group: g1, user: User.first).q.create!({title: 'title', markdown: '# markdown'})
      questions.push GroupKeeper.(group: g1, user: User.first).q.create!({title: 'title', markdown: '# markdown'})
      questions.push GroupKeeper.(group: g2, user: User.second).q.create!({title: 'title', markdown: '# markdown'})
      questions.push GroupKeeper.(group: g2, user: User.second).q.create!({title: 'title', markdown: '# markdown'})
      @questions = questions
    end

    after :all do
      @questions.each(&:destroy)
    end

    it do
      expect(GroupKeeper.(group: g1, user: User.first).q.index.to_a.size).to eq(3)
    end

    it do
      expect(GroupKeeper.(group: g2, user: User.second).q.index.to_a.size).to eq(2)
    end
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

  describe 'メンバーの追加削除' do
    let(:keeper) { GroupKeeper.(group: group, user: User.first) }

    it '追加' do
      expect {
        keeper.add!(User.fourth)
      }.to change(after_g.users, :size).by(1)
    end

    context '削除' do
      it 'オーナーによる' do
        keeper.add!(User.fourth)
        expect {
          keeper.remove!(User.fourth)
        }.to change(after_g.users, :size).by(-1)
      end

      it '本人による' do
        keeper.add!(User.fourth)
        User.fourth.invitations.first.accepted!
        expect {
          GroupKeeper.(group: after_g, user: User.fourth).remove!(User.fourth)
        }.to change(after_g.users, :size).by(-1)
      end
    end
  end

  describe 'グループの質問作成' do
    let(:keeper) { GroupKeeper.(group: group, user: User.second) }

    it '作成' do
      keeper.q.create!({title: 'title', markdown: '# markdown'})
      expect(group.questions.size).to eq(2)
      expect(User.second.questions.size).to eq(3)
    end
  end

  describe 'グループの質問への反応' do
    let(:keeper) { GroupKeeper.(group: group, user: User.second, question: q1) }
    let(:keeper2) { GroupKeeper.(group: group, user: User.fifth, question: q1) }

    before :each do
      keeper.q.assign!(User.fifth.login)
    end

    context '知っている人を紹介' do
      let!(:user_size) { q1.users.size }

      it 'メンバーだと紹介できる' do
        expect {
          keeper.q.assign!(User.seventh.login)
        }.to change(q1.users, :size).by(1)
      end

      it 'メンバー以外だとエラー' do
        expect { keeper.q.assign!(User.third.login) }.to raise_error(Group::NotMember)
      end
    end

    it '力になれません' do
      expect {
        keeper2.q.sorry!
      }.to change(q1.responded_user, :size).by(1)
    end

    it '返答する' do
      responses_size = q1.responses.size
      expect {
        keeper2.q.answer!(attributes_for(:comment, :valid))
      }.to change(q1.responded_user, :size).by(1)
      expect(q1.responses.size).to eq(responses_size + 1)
    end

    it 'ちょっとまって' do
      expect {
        keeper2.q.wait!
      }.to change(q1.ask_users.where { state == AskUser.status[:waited] }, :size).by(1)
    end


    it 'リプライ' do
      responses_size = q1.responses.size
      expect {
        GroupKeeper.(group: group, user: User.seventh, question: q1).q.reply_to!(q1.root, attributes_for(:comment, :valid))
      }.not_to change(q1.responded_user, :size)
      expect(q1.responses.size).to eq(responses_size + 1)
    end
  end
end
