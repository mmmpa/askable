# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

if ENV['RAILS_ENV'] != 'production'
  ('a'..'g').to_a.each do |name|
    User.create!(
      name: name,
      login: name * 4,
      email: "mmmpa.mmmpa+#{name}@gmail.com",
      password: name * 8
    ) rescue nil
  end

  5.times do |n|
    Question.create_by!(User.sample, {title: n.to_s, markdown: "## title", assigned: [User.sample.login]})
  end
end