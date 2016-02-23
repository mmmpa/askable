FactoryGirl.define do
  factory :question do
    trait :valid do
      user { create(:user, :valid) }
      title { SecureRandom.hex(4) }
      comment_params { [attributes_for(:comment, :valid_for_question)] }
    end
  end
end
