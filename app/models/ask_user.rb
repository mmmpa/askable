class AskUser < ActiveRecord::Base
  #
  # requested: 回答を要求されている状態、未回答
  # answered: 回答した状態。コメントがある。
  # respond: 反応済み状態。コメントはない。
  # assigned: 他のメンバーを紹介。respondと同意。
  #
  enum status: { requested: 0, answered: 1, respond: 2, assigned: 3 }

  belongs_to :user
  belongs_to :question
  belongs_to :comment
end
