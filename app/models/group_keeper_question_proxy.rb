class GroupKeeperQuestionProxy
  include MessBus::Hub

  attr_accessor :group, :question, :user

  def initialize(**options)
    self.group = options[:group]
    self.user = options[:user]
    self.question = options[:question]

    group.mine_or_die!(question) if question
  end

  def create!(question_params)
    Question.transaction do
      q = Question.create_by!(user, question_params)
      group.add_question(q)
      static_mess_bus.tell(:on_assigned, q, *q.users)
      q
    end
  end

  def index
    group.questions.index(user)
  end

  def show
    group.questions.show
  end

  def finish!
    question.finish_by!(user)
  end

  def sorry!
    question.sorry_by!(user)
  end

  def wait!
    question.wait_by!(user)
  end

  def assign!(*assigned)
    users = call_out(*assigned).each do |member|
      group.member_or_die!(member)
    end

    question.assign_by!(user, *users)
  end

  def answer!(new_comment)
    question.answer_by!(user, new_comment)
  end

  def reply_to!(replied, reply_params)
    group.mine_or_die!(replied.question)
    question.reply_to_by!(user, replied, reply_params)
  end

  def call_out(*assigned)
    assigned.map do |login|
      return login if User === login
      group.members.find_by(login: login) || (raise Group::NotMember)
    end
  end
end