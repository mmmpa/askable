module GroupUserRelative
  extend ActiveSupport::Concern

  included do
    has_many :own_groups, class_name: Group, foreign_key: :user_id
    has_many :group_users
    has_many :raw_groups, through: :group_users, inverse_of: :users

    def blocked_groups
      group_users.where { state == GroupUser.status[:blocked] }
    end

    def invitations
      group_users.where { state == GroupUser.status[:invited] }
    end

    def groups
      group_users.where { state == GroupUser.status[:accepted] }
    end
  end
end