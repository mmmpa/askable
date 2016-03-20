class GroupUser < ActiveRecord::Base
  #
  # invited: 招待されている
  # accepted: メンバーになっている
  # blocked: 招待を今後拒否する
  #
  enum state: {invited: 0, accepted: 1, blocked: 2}

  belongs_to :group, inverse_of: :group_users
  belongs_to :user, inverse_of: :group_users

  before_validation :initialize_value

  def initialize_value
    self.state ||= self.class.states[:invited]
  end

  def accept!
    accepted!
    static_mess_bus.tell(:on_invitation_accepted, group, user)
  end

  def reject!
    destroy!
  end

  def block!
    blocked!
  end
end

# == Schema Information
#
# Table name: group_users
#
#  created_at :datetime         not null
#  group_id   :integer          not null
#  id         :integer          not null, primary key
#  state      :integer          not null
#  updated_at :datetime         not null
#  user_id    :integer          not null
#
# Indexes
#
#  index_group_users_on_group_id              (group_id)
#  index_group_users_on_group_id_and_user_id  (group_id,user_id) UNIQUE
#  index_group_users_on_user_id               (user_id)
#
