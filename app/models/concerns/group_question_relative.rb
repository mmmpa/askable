module GroupQuestionRelative
  extend ActiveSupport::Concern

  included do
    has_one :group_question
    has_one :group, through: :group_question, inverse_of: :questions
  end
end