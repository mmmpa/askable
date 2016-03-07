class GroupKeeper
  attr_accessor :group, :question, :user

  class << self
    def call(**options)
      new(**options)
    end

    def create_in_question!(group, user, question_params)
      keeper = new(group: group, user: user)
      keeper.create_question!(user, question_params)
    end
  end

  def initialize(**options)
    self.group = options[:group] || (raise GroupRequired)
    self.user = options[:user] || (raise UserRequired)
    self.question = options[:question]

    group.member_or_die!(user)
    group.mine_or_die!(question) if question
  end

  def index
    group.questions
  end

  def create_question!(question_params)
    Question.transaction do
      q = Question.create_by!(user, question_params)
      group.add_question(q)
      q
    end
  end

  def sorry_question!
    question.sorry_by!(user)
  end

  def wait_question!
    question.wait_by!(user)
  end

  def assign_question!(*assigned)
    assigned.each do |member|
      group.member_or_die!(member)
    end
    question.assign_by!(user, *assigned)
  end

  def answer_question!(new_comment)
    question.answer_by!(user, new_comment)
  end

  def reply_to_question!(replied, reply_params)
    group.mine_or_die!(replied)
    question.reply_to_by!(user, replied, reply_params)
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