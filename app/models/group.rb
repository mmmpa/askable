class Group < ActiveRecord::Base
  belongs_to :user, inverse_of: :own_groups
  has_many :group_questions
  has_many :questions, through: :group_questions
  has_many :group_users, dependent: :delete_all
  has_many :users, through: :group_users, inverse_of: :raw_groups

  before_create :be_member

  def as_json(options = {})
    options.merge!(only: [:name], methods: [:users])
    super(options)
  end

  def be_member
    users << user
  end

  def members
    users.joins { group_users }.where { group_users.state == GroupUser.status[:accepted] }
  end

  def member_count
    users.joins { group_users }.where { group_users.state == GroupUser.status[:accepted] }.count
  end

  def opened_count
    questions.where { state.in(Question.status[:opened]) }.count
  end

  def all_members
    users
  end

  def update_by!(owner, params)
    owner_or_die!(owner)
    update!(params)
  end

  def add_by!(member, target)
    member_or_die!(member)
    raise AlreadyInvited if invited?(target)
    users << target
  end

  def invited?(target)
    users.include?(target)
  end

  def remove_by!(member, target)
    raise IsOwner if owner?(target)
    member == target || owner_or_die!(member)
    users.delete(target)
  end

  def owner_or_die!(owner)
    raise NotOwner unless owner?(owner)
  end

  def member_or_die!(member)
    raise NotMember if !owner?(member) && !member?(member)
  end

  def mine_or_die!(question)
    raise NotMine unless mine?(question)
  end

  def owner?(member)
    member == user
  end

  def member?(member)
    owner?(member) || members.include?(member)
  end

  def mine?(question)
    questions.include?(question)
  end

  def add_question(question)
    member_or_die!(question.user)
    questions << question
  end

  class AlreadyInvited < StandardError

  end

  class NotOwner < StandardError

  end

  class IsOwner < StandardError

  end

  class NotMember < StandardError

  end

  class NotMine < StandardError

  end
end
