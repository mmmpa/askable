module GroupUserRelative
  extend ActiveSupport::Concern

  included do
    has_many :my_groups, class_name: Group, foreign_key: :user_id
    has_many :group_users, -> { where { state == GroupUser.status[:accepted] } }
    has_many :invitations, -> { where { state == GroupUser.status[:invited] } }, class_name: GroupUser
    has_many :blocked_groups, -> { where { state == GroupUser.status[:blocked] } }, class_name: GroupUser
    has_many :groups, through: :group_users
  end
end