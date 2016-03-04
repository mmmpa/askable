# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

if ENV['DEV_DATA']
  User.destroy_all
  Question.destroy_all

  ('a'..'g').to_a.each do |name|
    User.create!(
      name: name,
      login: name * 4,
      email: "mmmpa.mmmpa+#{name}@gmail.com",
      password: name * 8
    ) rescue nil
  end

  5.times do |n|
    owner = User.sample
    assigned = User.sample(n - 1)
    Question.create_by!(owner, {title: n.to_s, markdown: "# title", assigned: assigned})
  end
end

if ENV['DEV_DATA'] || ENV['LARGE_DATA']
  100.times do |n|
    owner = User.sample
    assigned = User.sample(n - 1)
    Question.create_by!(owner, {title: n.to_s, markdown: "# title", assigned: assigned})
  end
end