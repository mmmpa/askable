class Group < ActiveRecord::Base
  include SpecialGroup
  include AsColumnWrapper

  belongs_to :user, inverse_of: :my_groups

  #
  # 問題関連
  #
  has_many :group_questions
  has_many :questions, through: :group_questions
  has_many :group_opened_questions, class_name: GroupQuestion
  has_many :opened_questions, -> { where { state == Question.status[:opened] } }, through: :group_opened_questions, source: :question
  has_many :group_closed_questions, class_name: GroupQuestion
  has_many :closed_questions, -> { where { state == Question.status[:closed] } }, through: :group_closed_questions, source: :question

  #
  # メンバー関連
  #
  has_many :group_users, dependent: :delete_all
  has_many :users, through: :group_users, inverse_of: :groups
  has_many :group_members, -> { where { state == GroupUser.status[:accepted] } }, class_name: GroupUser
  has_many :members, -> { normal }, through: :group_members, source: :user

  validates :name, :description, :user,
            presence: true

  #
  # indexでの利用時にはカウント数を挿入しておく
  #
  scope :index, -> {
    joins { [group_users.outer, questions.outer] }
      .select {
      ['groups.*',
       %{(SELECT
            COUNT(DISTINCT "group_users"."id")
            FROM "group_users"
            WHERE "group_users"."state" = #{GroupUser.status[:accepted]}
              AND "group_users"."group_id" = "groups"."id"
          ) AS "as_member_count"},
       %{(SELECT
            COUNT(DISTINCT "questions"."id")
            FROM "questions"
            LEFT OUTER JOIN "group_questions"
              ON "group_questions"."question_id" = "questions"."id"
            WHERE "questions"."state" = #{Question.status[:opened]}
              AND "group_questions"."group_id" = "groups"."id"
        ) AS "as_opened_count"},
      ] }
      .group { id }
      .order { updated_at.desc }
  }

  before_create :be_member

  class << self
    def create_by!(user, params)
      g = Group.new(params)
      g.user = user
      g.save!
      g
    end
  end

  def as_json(options = {})
    options.merge!(only: [:name])
    super(options).merge!(users: members)
  end

  def be_member
    users << user
    group_users.last.state = GroupUser.status[:accepted]
  end

  def member_count
    as_or(:member_count) { members.count }
  end

  def opened_count
    as_or(:opened_count) { opened_questions.count }
  end

  def all_members
    members
  end

  #alias_method :dispose!, :dispose_by!
  def dispose_by!(member)
    member_or_die!(member)
    if owner?(member)
      destroy!
    elsif member?(member)
      remove_by!(member, member)
    end
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

# == Schema Information
#
# Table name: groups
#
#  created_at  :datetime         not null
#  description :string           not null
#  id          :integer          not null, primary key
#  name        :string           not null
#  updated_at  :datetime         not null
#  user_id     :integer          not null
#
# Indexes
#
#  index_groups_on_user_id  (user_id)
#
