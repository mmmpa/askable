class Question < ActiveRecord::Base
  include QuestionResponder

  attr_accessor :assigned

  belongs_to :user
  has_many :comments, inverse_of: :question, dependent: :delete_all
  has_many :ask_users, dependent: :destroy
  has_many :users, through: :ask_users

  validates :title, :user,
            presence: true

  validate :require_head_comment

  #
  # indexでの利用時にはカウント数をSQLで挿入しておく
  #
  scope :index, -> {
    includes { [:user] }
      .joins { [ask_users, comments] }
      .select {
      ['questions.*',
       %q{COUNT(DISTINCT "comments"."id") AS as_commented_count},
       %q{COUNT(DISTINCT "ask_users"."id") AS as_assigned_count},
       %{(SELECT
            COUNT(DISTINCT "ask_users"."id")
            FROM "ask_users"
            WHERE "ask_users"."question_id" = "questions"."id"
              AND "ask_users"."state" IN (#{AskUser.responded_status.join(',')})
          ) AS "as_responded_count"},
      ] }
      .group { id }
      .order { created_at.desc }
  }

  scope :show, -> { includes(:comments).joins { user }.select { ["questions.*", user.name.as(:as_author_name)] } }

  class << self
    def create_by!(user, question_params)
      comment = Comment.new(user: user, markdown: question_params.delete(:markdown))

      user_logins = question_params.delete(:assigned) || []
      users = call_assigned(*user_logins)

      question_params.merge!(user: user, users: users, comments: [comment])

      Question.create!(question_params)
    end

    def call_assigned(*users)
      users.uniq.map { |user|
        case user
          when User
            user
          else
            User.find_by(login: user)
        end
      }.compact
    end
  end

  def comment_tree
    @stored_tree ||= responses.inject({}) { |a, comment|
      a[comment.comment_id] ||= []
      a[comment.comment_id].push(comment)
      a
    }.each_value { |replies|
      replies.sort_by! { |reply|
        reply.created_at
      }.reverse!
    }
  end

  def author_name
    respond_to?(:as_author_name) ? as_author_name : user.name
  end

  def commented_count
    respond_to?(:as_commented_count) ? as_commented_count - 1 : comments.size - 1
  end

  def assigned_count
    respond_to?(:as_assigned_count) ? as_assigned_count : users.size
  end

  def responded_count
    respond_to?(:as_responded_count) ? as_responded_count : responded_user.size
  end

  def responses
    return [] if comments.size == 1
    comments.with_author.order { created_at.desc }[0..comments.size - 2]
  end

  def responded?(user)
    return true unless users.include?(user)

    !not_yet_responded?(user)
  end

  def not_yet_responded?(user)
    not_yet_user.include?(user)
  end

  def not_yet_user
    user_ids = ask_users.not_yet.select { user_id }
    users_with_respond_state(user_ids)
  end

  def responded_user
    user_ids = ask_users.responded.select { user_id }
    users_with_respond_state(user_ids)
  end

  # user_idsはサブクエリがのぞましい
  def users_with_respond_state(user_ids)
    users
      .where { id.in(user_ids) }
      .select { ['users.*', ask_users.state.as(respond_state)] }
  end

  def creation_errors
    base = errors.messages
    base.delete(:comments)
    if (markdown_error = comments.last.errors.messages[:markdown])
      base.merge!(markdown: markdown_error)
    end
    base
  end

  def answer_errors
    base = {}
    if (markdown_error = comments.last.errors.messages[:markdown])
      base.merge!(markdown: markdown_error)
    end
    base
  end

  def assign_errors
    errors
  end

  def assign!(*assigned)
    self.class.call_assigned(*assigned).each { |user| users << user }
    save!
  end

  def require_head_comment
    errors.add(:comments, :at_least_one_comment) if comments.size == 0
  end

  def add_comment!(comment)
    comments << comment
    save!
  end

  def reply_to_by!(user, replied, reply_params)
    raise NotInTree unless comments.include?(replied)
    reply = detect_comment(reply_params)
    reply.user = user
    reply.comment = detect_reply_target(replied)
    comments << reply
    save!
    reply
  end

  def reply_to!(replied, new_comment)
    comment = detect_comment(new_comment)
    comment.comment = detect_reply_target(replied)
    comments << new_comment
    save!
  end

  def detect_comment(comment)
    case comment
      when Comment
        comment
      else
        Comment.new(comment)
    end
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

  class NotAsked < StandardError

  end

  class NotInTree < StandardError

  end
end
