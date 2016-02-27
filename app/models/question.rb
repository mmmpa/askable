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

  def responses
    return [] if comments.size == 1
    comments.order { created_at.desc }[0..comments.size - 2]
  end

  def respondable?(user)
    users.include?(user) && not_yet_responded?(user)
  end

  def ask_for(target)
    ask_users.where { user == target }.first
  end

  def sorry_by(user)
    ask_for(user).responded!
  end

  def assign_by(user, *assigned)
    assign!(*assigned)
    ask_for(user).assigned!
  end

  def answer_by(user, new_comment_params)
    reply_to!(root, Comment.new(new_comment_params.merge!(user: user)))
    ask_for(user).answered!
  end

  def not_yet_user
    users.joins { ask_users }.where { ask_users.state.in(AskUser.not_yet_status) }
  end

  def responded_user
    users.joins { ask_users }.where { ask_users.state.in(AskUser.responded_status) }
  end

  def not_yet_responded?(user)
    ask_for(user).requested?
  end

  def creation_errors
    base = errors.messages
    base.delete(:comments)
    if (markdown_error = comments.first.errors.messages[:markdown])
      base.merge!(markdown: markdown_error)
    end
    base
  end

  def assign!(*assigned)
    assigned.each { |user| users << user }
    save!
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
