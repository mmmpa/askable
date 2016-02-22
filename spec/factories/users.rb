FactoryGirl.define do
  factory :user do
    name { SecureRandom.hex(4) }
    login { SecureRandom.hex(4) }
    email { "ex#{SecureRandom.hex(4)}@example.com" }
  end
end
