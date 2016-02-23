FactoryGirl.define do
  factory :owner do
    trait :valid do
      name { SecureRandom.hex(4) }
      login { SecureRandom.hex(4) }
      email { "ex#{SecureRandom.hex(4)}@example.com" }
      password { SecureRandom.hex(8) }
    end
  end
end
