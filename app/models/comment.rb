class Comment < ActiveRecord::Base
  belongs_to :user #, inverse_of: :comments
  belongs_to :comment
  #has_many :comments
  belongs_to :question, inverse_of: :comments

  before_validation :render_markdown!
  before_destroy :check_not_root_comment

  validates :html, :markdown, :user, :question,
            presence: true

  #after_validation ->{pp self.errors}

  def check_not_root_comment
    throw CannotDestroyRootComment if root?
  end

  def root?
    question.root?(self)
  end

  def render_markdown!
    self.html = markdown
  end

  class CannotDestroyRootComment < StandardError

  end
end
