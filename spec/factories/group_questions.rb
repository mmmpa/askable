FactoryGirl.define do
  factory :group_question do
    trait :valid do
      group { create(:group, :valid) }
      question { create(:question, :valid) }
    end
  end
end
