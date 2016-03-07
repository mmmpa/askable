FactoryGirl.define do
  factory :group_user do
    trait :valid do
      group { create(:group, :valid) }
      user { User.first }
    end
  end
end
