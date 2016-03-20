module QuestionIndexer
  extend ActiveSupport::Concern

  included do
    #
    # indexでの利用時にはカウント数を挿入しておく
    #
    scope :index, ->(viewer) {
      joins { [ask_users.outer, comments.outer] }
        .select {
        ['questions.*',
         %q{(SELECT substr("comments"."html", 0, 300)
            FROM "comments"
            WHERE "comments"."question_id" = "questions"."id"
            ORDER BY "comments"."created_at"
            LIMIT 1
          ) AS "as_comment_html"},
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
              AND "ask_users"."state" IN (#{AskUser.responded_states.join(',')})
          ) AS "as_responded_count"},
         %{(SELECT
            COUNT(DISTINCT "ask_users"."id")
            FROM "ask_users"
            WHERE "ask_users"."question_id" = "questions"."id"
              AND "ask_users"."state" IN (#{AskUser.not_yet_states.join(',')})
              AND "ask_users"."user_id" = #{viewer.id}
          ) AS "as_my_assigned"},
        ] }
        .group { id }
        .order { updated_at.desc }
    }

    scope :opened, -> { where { state.in(Question.states[:opened]) } }
    scope :closed, -> { where { state.in(Question.states[:closed]) } }
    scope :asked, ->(owner_user) { where { user == owner_user } }
    scope :requested, ->(owner_user) { where { ask_users.user_id == owner_user.id } }
  end
end