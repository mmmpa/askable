class Question < ActiveRecord::Base
  attr_accessor :comment_params

  belongs_to :user
  has_many :comments

  def root
    comments.first
  end
end
