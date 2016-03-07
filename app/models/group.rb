class Group < ActiveRecord::Base
  belongs_to :user, inverse_of: :own_groups
  has_many :group_questions
  has_many :questions, through: :group_questions
  has_many :group_users
  has_many :users, through: :group_users, inverse_of: :raw_groups

  def members
    users.joins { group_users }.where { group_users.state == GroupUser.status[:accepted] }
  end

  def all_members
    [user] + users
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
    members.include?(member)
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

  class NotMember < StandardError

  end

  class NotMine < StandardError

  end
end
