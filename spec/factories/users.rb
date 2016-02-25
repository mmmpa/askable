FactoryGirl.define do
  factory :user do
    trait :valid do
      name { User.count }
      login { "user#{User.count}" }
      email { "mmmpa.mmmpa+#{SecureRandom.hex(4)}@gmail.com" }
      password { "password#{User.count}" }
    end
  end
end
