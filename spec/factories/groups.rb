FactoryGirl.define do
  factory :group do
    trait :valid do
      name { SecureRandom.hex(4) }
      user { User.first }
      description { SecureRandom.hex(4) }
    end
  end
end
