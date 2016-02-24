FactoryGirl.define do
  factory :question do
    trait :valid do
      user { User.first }
      title { SecureRandom.hex(4) }
      comments { [build(:comment, :valid_for_question)] }
    end
  end
end
