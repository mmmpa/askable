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

  class << self
    alias_method :status, :states
  end

  def initialize_value
    self.state ||= self.class.status[:invited]
  end
end
