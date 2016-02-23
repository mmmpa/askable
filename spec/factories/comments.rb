FactoryGirl.define do
  factory :comment do
    trait :valid do
      markdown '# test'
      user { create(:user, :valid) }
      question { create(:question, :valid) }
    end

    trait :valid_for_question do
      user { create(:user, :valid) }
      markdown '# test'
    end

    trait :reply do
      comment { create(:comment, :valid) }
    end

    factory :valid_reply, traits: [:valid, :reply]
  end
end
