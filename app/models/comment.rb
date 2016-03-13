class Comment < ActiveRecord::Base
  include PrettyDate
  include MarkdownRenderer

  belongs_to :user, inverse_of: :comments
  belongs_to :comment
  has_many :comments
  belongs_to :question, inverse_of: :comments

  before_destroy :check_not_root_comment

  validates :html, :markdown, :user, :question,
            presence: true

  scope :with_author, -> { joins { user }.select { ["comments.*", user.name.as(:as_author_name)] } }


  def author_name
    respond_to?(:as_author_name) ? as_author_name : user.name
  end

  def check_not_root_comment
    question.destroyed?
    raise CannotDestroyRootComment if root?
  end

  def root?
    question.root?(self)
  end

  class CannotDestroyRootComment < StandardError

  end
end

# == Schema Information
#
# Table name: comments
#
#  comment_id  :integer
#  created_at  :datetime         not null
#  html        :text             not null
#  id          :integer          not null, primary key
#  markdown    :text             not null
#  question_id :integer          not null
#  updated_at  :datetime         not null
#  user_id     :integer          not null
#
# Indexes
#
#  index_comments_on_comment_id   (comment_id)
#  index_comments_on_question_id  (question_id)
#  index_comments_on_user_id      (user_id)
#
