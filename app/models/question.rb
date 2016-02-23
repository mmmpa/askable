class Question < ActiveRecord::Base
  attr_accessor :comment_params

  belongs_to :user
  has_many :comments, inverse_of: :question
  accepts_nested_attributes_for :comments

  validates :title, :user,
            presence: true

  validate :require_head_comment

  before_validation -> { pp comments }
  before_validation :build_comments!

  def require_head_comment
    errors.add(:comments, :at_least_one_comment) if comments.size == 0
  end

  def root
    comments.first
  end

  def root?(comment)
    comment == root
  end
end
