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
  let!(:responses_count) { question.responses.count }

  scenario '力になれません' do
    visit question_path(question.id)
    take_ss('無入力')

    first('.respond.sorry').click
    take_ss('クリック')

    expect(after_q.responded_count).to eq(responded_count + 1)

    take_ss('リロード済み', 1)
    find('.responded-list .fa-sorryed')
  end

  scenario 'ちょっとまってください' do
    visit question_path(question.id)
    take_ss('無入力')

    first('.respond.wait').click
    take_ss('クリック')

    expect(after_q.responded_count).to eq(responded_count)

    take_ss('リロード済み', 1)
    find('.not-yet-list .fa-waited')
  end

  scenario '知ってる人を紹介する' do
    visit question_path(question.id)
    take_ss('無入力')

    now = all('.not-yet-list li').size

    first('.respond.assign-tab').click
    take_ss('クリック')

    expect(all('.assigner.team-member', text: User.first.name).size).to eq(0)
    expect(all('.assigner.team-member', text: User.third.name).size).to eq(0)
    expect(all('.assigner.team-member', text: User.fourth.name).size).to eq(0)

    first('.assigner.team-member').click
    take_ss('選択済み')

    first('.respond.submit').click
    take_ss('送信済み', 1)

    expect(after_q.assigned_count).to eq(assigned_count + 1)

    take_ss('リロード済み', 1)
    find('.responded-list .fa-assigned')
    expect(all('.not-yet-list li').size).to eq(now)
  end

  scenario '返答する' do
    visit question_path(question.id)
    take_ss('無入力')

    now = all('.not-yet-list li').size

    content = SecureRandom.hex(4)
    find('.respond .CodeMirror').send_keys(content)
    take_ss('記入済み')

    first('.respond.submit').click
    take_ss('送信済み', 1)

    expect(after_q.responded_count).to eq(responded_count + 1)

    take_ss('リロード済み', 1)
    find('.responded-list .fa-answered')
    find('.show-question.response', text: content)
    expect(all('.not-yet-list li').size).to eq(now - 1)
  end

  scenario 'リプライする' do
    question.reply_to_by!(User.third, question.root, {markdown: '#test'})

    visit question_path(question.id)
    take_ss('無入力')

    now = all('.not-yet-list li').size

    find('.show-question.reply-to-reply-button').click
    take_ss('リプライ欄表示')


    content = SecureRandom.hex(4)
    find('.show-question.reply-to-reply-area .CodeMirror').send_keys(content)
    take_ss('記入済み')

    first('.show-question.reply-to-reply-area .submit').click
    take_ss('送信済み', 1)

    expect(after_q.responses.size).to eq(2)

    take_ss('リロード済み', 1)
    find('.show-question.response', text: content)
    expect(all('.show-question.response-owner').size).to eq(2)
  end
end
