module AskRelative
  extend ActiveSupport::Concern

  included do
    has_many :questions
    has_many :ask_users
    has_many :asks, through: :ask_users
    has_many :comments
  end
end