class GroupKeeper
  attr_accessor :group, :q, :user

  class << self
    def call(**options)
      new(**options)
    end
  end

  def initialize(**options)
    self.group = options[:group] || (raise GroupRequired)
    self.user = options[:user] || (raise UserRequired)
    self.q = GroupKeeperQuestionProxy.new(**options)

    group.member_or_die!(user)
  end

  def add!(*targets)
    targets.each do |target|
      group.add_by!(user, target)
    end
  end

  def remove!(target)
    group.remove_by!(user, target)
  end

  class GroupRequired < StandardError

  end

  class UserRequired < StandardError

  end

  class NotGroupMember < StandardError

  end

  class NotGroupQuestion < StandardError

  end
end