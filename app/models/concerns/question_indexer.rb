module QuestionIndexer
  extend ActiveSupport::Concern

  included do
    #
    # indexでの利用時にはカウント数を挿入しておく
    #
    scope :index, ->(viewer) {
      includes { user }.
        joins { [ask_users.outer, comments.outer] }
        .select {
        ['questions.*',
         %q{COUNT(DISTINCT "comments"."id") AS as_commented_count},
         %q{(SELECT
            COUNT(DISTINCT "ask_users"."id")
            FROM "ask_users"
            WHERE "ask_users"."question_id" = "questions"."id"
          ) AS "as_assigned_count"},
         %{(SELECT
            COUNT(DISTINCT "ask_users"."id")
            FROM "ask_users"
            WHERE "ask_users"."question_id" = "questions"."id"
              AND "ask_users"."state" IN (#{AskUser.responded_status.join(',')})
          ) AS "as_responded_count"},
         %{(SELECT
            COUNT(DISTINCT "ask_users"."id")
            FROM "ask_users"
            WHERE "ask_users"."question_id" = "questions"."id"
              AND "ask_users"."state" IN (#{AskUser.not_yet_status.join(',')})
              AND "ask_users"."user_id" = #{viewer.id}
          ) AS "as_my_assigned"},
        ] }
        .group { id }
        .order { updated_at.desc }
    }

    scope :opened, -> { where { state.in(Question.status[:opened]) } }
    scope :closed, -> { where { state.in(Question.status[:closed]) } }
    scope :asked, ->(owner_user) { where { user == owner_user } }
    scope :requested, ->(owner_user) { where { ask_users.user_id == owner_user.id } }
  end
end