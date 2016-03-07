FactoryGirl.define do
  factory :user do
    trait :valid do
      name { "user_name_#{User.count}" }
      login { "user_login_#{User.count}" }
      email { "mmmpa.mmmpa+#{SecureRandom.hex(4)}@gmail.com" }
      password { "password#{User.count}" }
    end
  end
end
