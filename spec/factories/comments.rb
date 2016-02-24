FactoryGirl.define do
  factory :comment do
    trait :valid do
      markdown '# test'
      user { User.first }
      question { create(:question, :valid) }
    end

    trait :valid_for_question do
      user { User.first }
      markdown { "# #{SecureRandom.hex(4)}"}
    end

    trait :reply do
      comment { create(:comment, :valid) }
    end

    factory :valid_reply, traits: [:valid, :reply]
  end
end
