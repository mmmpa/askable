module GroupUserRelative
  extend ActiveSupport::Concern

  included do
    has_many :own_groups, class_name: Group, foreign_key: :user_id
    has_many :group_users
    has_many :groups, through: :group_users, inverse_of: :users
  end
end