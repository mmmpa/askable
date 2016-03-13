FactoryGirl.define do
  factory :message do
    trait :valid do
      owner { User.second }
      user { User.first }
      title { SecureRandom.hex(4) }
      markdown { "# #{SecureRandom.hex(4)}" }
    end
  end
end
