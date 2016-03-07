class GroupKeeper
  attr_accessor :group, :question

  class << self
    def call(**options)
      new(**options)
    end

    def create_in_by!(group, user, question_params)
      keeper = new(group: group, user: user)
      keeper.create_by!(user, question_params)
    end
  end

  def initialize(**options)
    self.group = options.group || (raise GroupRequired)
    self.user = options.user || (raise UserRequired)
    self.question = options.question

    member_or_die!
    mine_or_die!
  end

  def mine_or_die!
    return unless question
    group.mine_or_die!(question)
    true
  end

  def member_or_die!
    return unless user
    group.member_or_die!(user)
    true
  end

  def create_by!(user, question_params)
    Question.transaction do
      q = Question.create_by!(user, question_params)
      group.questions << q
    end

    q
  end

  def method_missing(name, *args)
    return super unless question.respond_to?(name)

    question.send(name, *args)
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