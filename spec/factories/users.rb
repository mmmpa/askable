FactoryGirl.define do
  factory :user do
    trait :valid do
      name { User.count }
      login { "user#{User.count}" }
      email { "ex#{User.count}@example.com" }
      password { "password#{User.count}" }
    end
  end
end
