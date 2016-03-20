class Question < ActiveRecord::Base
  include GroupQuestionRelative
  include QuestionResponder
  include QuestionIndexer
  include QuestionErrorArranger
  include AsColumnWrapper
  include PrettyDate

  #
  # opened: 回答受付中
  # closed: 回答締め切り
  #
  enum state: {opened: 0, closed: 1}

  attr_accessor :assigned

  belongs_to :user
  has_many :comments, inverse_of: :question, dependent: :delete_all
  has_many :ask_users, dependent: :destroy
  has_many :users, through: :ask_users

  validates :title, :user,
            presence: true

  validate :require_head_comment

  scope :show, -> { includes(:comments).joins { user }.select { ["questions.*", user.name.as(:as_author_name)] } }

  before_validation :initialize_value
  before_validation :check_not_yet_completed

  def check_not_yet_completed
    raise AlreadyClosed if self.class.states[state_was] == self.class.states[:closed]
  end

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
            begin
              User.find_by(login: user)
            rescue => e
              p e
            end
            User.find_by(login: user) || (raise ActiveRecord::RecordNotFound)
        end
      }.compact
    end
  end

  def initialize_value
    self.state ||= self.class.states[:opened]
  end

  def owner?(owner)
    user == owner
  end

  def comment_tree
    @stored_tree ||= responses.group_by { |comment|
      comment.comment_id
    }.each_value { |replies|
      replies.sort_by! { |reply|
        reply.created_at
      }.reverse!
    }
  end

  def not_yet_responded?(user)
    not_yet_user.include?(user)
  end

  def author_name
    as_or(:author_name) { user.name }
  end

  def commented_count
    as_or(:commented_count) { comments.size } - 1
  end

  def assigned_count
    as_or(:assigned_count) { users.size }
  end

  def comment_html
    as_or(:comment_html) { root.html[0..300] }
  end

  def description
    comment_html.gsub(/<.+?>/, '').gsub(/<[^>]*\Z/, '')
  end

  def responded_count
    as_or(:responded_count) { responded_user.size }
  end

  def all_responded?
    responded_count == assigned_count
  end

  def responses
    return [] if comments.size == 1
    comments.with_author.order { created_at.desc }[0..comments.size - 2]
  end

  def assigned?(user)
    result = as_or(:my_assigned) { users.include?(user) }
    result == 0 ? false : !!result
  end

  def responded?(user)
    return true unless users.include?(user)

    !not_yet_responded?(user)
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

  def require_head_comment
    errors.add(:comments, :at_least_one_comment) if comments.size == 0
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
        comments.find(replied)
    end
  rescue
    raise NotInTree
  end

  def root
    comments.first
  end

  def root?(comment)
    comment == root
  end

  class CannotReply < StandardError

  end

  class NotOwner < StandardError

  end

  class NotAsked < StandardError

  end

  class NotInTree < StandardError

  end

  class AlreadyClosed < StandardError

  end
end

# == Schema Information
#
# Table name: questions
#
#  created_at :datetime         not null
#  id         :integer          not null, primary key
#  state      :integer          not null
#  title      :string           not null
#  updated_at :datetime         not null
#  user_id    :integer          not null
#
# Indexes
#
#  index_questions_on_user_id  (user_id)
#
