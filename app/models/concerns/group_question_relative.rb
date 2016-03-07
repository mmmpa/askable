module GroupQuestionRelative
  extend ActiveSupport::Concern

  included do
    has_many :group_questions
    has_many :groups, through: :group_questions, inverse_of: :questions
  end
end