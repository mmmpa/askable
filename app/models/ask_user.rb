class AskUser < ActiveRecord::Base
  #
  # requested: 回答を要求されている状態、未回答
  # answered: 回答した状態。コメントがある。
  # respond: 反応済み状態。コメントはない。
  # assigned: 他のメンバーを紹介。respondと同意。
  # timeout: 回答せずに質問が終了した場合。
  #
  enum state: {requested: 0, answered: 1, responded: 2, assigned: 3, waited: 4, timeouted: 5}


  belongs_to :user
  belongs_to :question
  belongs_to :comment

  scope :not_yet, -> { where { state.in(AskUser.not_yet_status) } }
  scope :responded, -> { where { state.in(AskUser.responded_status) } }

  before_validation :initialize_value

  class << self
    alias_method :status, :states

    def not_yet_status
      [status[:requested], status[:waited]]
    end

    def responded_status
      cloned = status.clone
      cloned.delete(:requested)
      cloned.delete(:waited)
      cloned.each_value.inject([]) { |a, value| a << value }
    end
  end

  def initialize_value
    self.state ||= self.class.status[:requested]
  end

  def answer!
    answered!
  end

  def respond!
    responded!
    question.reply_to_by!(User.system, question.root, Comment.new(use_raw: true, markdown: "#{user.name}さんは力になれないそうです"))
  end

  def assign!
    assigned!
    question.reply_to_by!(User.system, question.root, Comment.new(use_raw: true, markdown: "#{user.name}さんが回答者を紹介してくれました"))
  end

  def wait!
    was = state
    waited!
    if self.class.status[was] == self.class.status[:requested]
      question.reply_to_by!(User.system, question.root, Comment.new(use_raw: true, markdown: "#{user.name}さんは少し待ってほしいそうです"))
    end
  end

  def timeout!
    timeouted!
  end
end

# == Schema Information
#
# Table name: ask_users
#
#  comment_id  :integer
#  created_at  :datetime         not null
#  id          :integer          not null, primary key
#  question_id :integer          not null
#  state       :integer          not null
#  updated_at  :datetime         not null
#  user_id     :integer          not null
#
# Indexes
#
#  index_ask_users_on_comment_id               (comment_id)
#  index_ask_users_on_question_id              (question_id)
#  index_ask_users_on_user_id                  (user_id)
#  index_ask_users_on_user_id_and_question_id  (user_id,question_id) UNIQUE
#
