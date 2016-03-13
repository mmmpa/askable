class GroupQuestion < ActiveRecord::Base
  belongs_to :group, inverse_of: :group_questions
  belongs_to :question, inverse_of: :group_question
end

# == Schema Information
#
# Table name: group_questions
#
#  created_at  :datetime         not null
#  group_id    :integer
#  id          :integer          not null, primary key
#  question_id :integer
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_group_questions_on_group_id                  (group_id)
#  index_group_questions_on_group_id_and_question_id  (group_id,question_id) UNIQUE
#  index_group_questions_on_question_id               (question_id)
#
