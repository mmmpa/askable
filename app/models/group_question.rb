class GroupQuestion < ActiveRecord::Base
  belongs_to :group, inverse_of: :group_questions
  belongs_to :question, inverse_of: :group_questions
end
