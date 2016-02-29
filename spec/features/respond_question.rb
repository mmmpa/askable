require 'capybara_helper'

feature '回答する' do
  before :each do |ex|
    ready_ss(ex)
    authlogic_login(User.first)
  end

  let(:question) do
    q = create(:question, :valid, user: User.second)
    q.assign!(User.first, User.third, User.fourth)
    q
  end

  let(:after_q) { Question.find(question.id) }

  let!(:responded_count) { question.responded_count }
  let!(:my_comment_count) { question.comments.where { user == User.first }.size }
  let!(:assigned_count) { question.assigned_count }

  scenario '力になれません' do

    visit question_path(question.id)
    take_ss('無入力')

    first('.respond.sorry').click
    take_ss('クリック')

    expect(after_q.responded_count).to eq(responded_count + 1)

    sleep 1
    take_ss('リロード済み')
  end
end
