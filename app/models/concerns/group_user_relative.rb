module GroupUserRelative
  extend ActiveSupport::Concern

  included do
    has_many :own_groups, class_name: Group, foreign_key: :user_id
    has_many :group_users
    has_many :raw_groups, class_name: Group, through: :group_users, source: :group

    def blocked_groups
      group_users.where { state == GroupUser.status[:blocked] }
    end

    def invitations
      group_users.where { state == GroupUser.status[:invited] }
    end

    def groups
      Group.joins { [user, group_users] }.where { (user == my { self }) | ((group_users.user == my { self }) & (group_users.state == GroupUser.status[:accepted])) }
    end
  end
end