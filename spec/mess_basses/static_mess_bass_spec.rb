require 'rails_helper'

RSpec.describe StaticBus, type: :model do
  let(:group) { create(:group, :valid) }
  let(:question) { create(:question, :valid) }
  before :each do
    group.add_by!(User.first, User.second)
    group.add_by!(User.first, User.third)
    group.add_question(question)
  end

  describe '全員の反応が帰ってきた時にメッセージを送信' do
    before :each do
      StaticBus.new.on_all_assignee_responded(question)
    end

    context '質問主にメッセージ' do
      it 'メソッド' do
        expect(question.user.messages.first.title).to include(question.title)
      end

      it 'イベント経由' do
        question.assign_by!(User.first, User.second)
        question.sorry_by!(User.second)
        expect(question.user.messages.first.title).to include(question.title)
      end
    end
  end

  describe '回答者として追加されたらメッセージを送信' do
    context '回答者にメッセージ' do
      it 'メソッド' do
        StaticBus.new.on_assigned(question, User.second)
        expect(User.second.messages.first.title).to include(question.title)
      end

      it 'イベント経由' do
        question = GroupKeeper.(group: group, user: User.first).q.create!({title: 'new title', markdown: 'm', assigned: [User.second, User.third].map(&:login)})
        expect(User.second.messages.first.title).to include('new title')
        expect(User.third.messages.first.title).to include('new title')
      end

      it 'イベント経由' do
        question.assign_by!(User.first, User.second)
        expect(User.second.messages.first.title).to include(question.title)
      end
    end
  end

end