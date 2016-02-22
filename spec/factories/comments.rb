FactoryGirl.define do
  factory :comment do
    html "MyText"
    markdown "MyText"
    reply_to ""
    ask ""
  end
end
