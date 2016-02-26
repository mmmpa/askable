class Question < ActiveRecord::Base
  belongs_to :user
  has_many :comments, inverse_of: :question
  has_many :ask_users
  has_many :users, through: :ask_users

  validates :title, :user,
            presence: true

  validate :require_head_comment

  class << self
    def create_by!(user, question_params)
      comment = Comment.new(user: user, markdown: question_params.delete(:markdown))

      user_logins = question_params.delete(:assigned) || []
      users = user_logins.uniq.map { |login| User.find_by(login: login) }.compact

      question_params.merge!(user: user, users: users, comments: [comment])

      Question.create!(question_params)
    end
  end

  def assign(*assigned)
    users + assigned
  end

  def require_head_comment
    errors.add(:comments, :at_least_one_comment) if comments.size == 0
  end

  def add_comment!(comment)
    comments << comment
    save!
  end

  def reply_to!(replied, new_comment)
    new_comment.comment = detect_reply_target(replied)
    comments << new_comment
    save!
  end

  def detect_reply_target(replied)
    case replied
      when Comment
        comments.find(replied.id)
      else
        comments.find(id)
    end
  rescue
    raise CannotReplyOtherQuestionComment
  end

  def root
    comments.first
  end

  def root?(comment)
    comment == root
  end

  class CannotReplyOtherQuestionComment < StandardError

  end
end
