class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :comment
  has_many :comments
  belongs_to :question, inverse_of: :comments

  before_validation :render_markdown!

  def render_markdown!
    self.html = markdown
  end
end
