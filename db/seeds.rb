# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

p :seeding

User.new(login: 'a', name: 'system', password: SecureRandom.uuid, email: 'a').save(validate: false)
User.new(login: 'b', name: 'information', password: SecureRandom.uuid, email: 'b').save(validate: false)
User.new(login: 'c', name: 'error', password: SecureRandom.uuid, email: 'c').save(validate: false)
User.new(login: 'd', name: 'invitation', password: SecureRandom.uuid, email: 'd').save(validate: false)
User.new(login: 'z', name: '退会ユーザー', password: SecureRandom.uuid, email: 'e').save(validate: false)

if ENV['DEV_DATA']
  User.destroy_all
  Question.destroy_all
  Group.destroy_all

  question_numbers = [15, 5, 12, 20, 13, 12, 0, 1]

  ('a'..'g').to_a.each do |name|
    User.create!(
      name: "user_name_#{name}",
      login: name * 4,
      email: "mmmpa.mmmpa+#{name}@gmail.com",
      password: name * 8
    )
  end

  ('a'..'c').to_a.each_with_index do |name, index|
    owner = User.find_by(login: name * 4)

    g = Group.create!(
      name: "group_name_#{name}",
      user: owner,
      description: 'デスクリプショん'
    )

    2.times do
      g.add_by!(owner, User.sample) rescue nil
    end

    GroupUser.all.each(&:accepted!)

    question_numbers[index].times do |n|
      owner = g.users.sample
      assigned = g.users.sample(n - 1)
      q = Question.create_by!(owner, {title: n.to_s, markdown: "# title", assigned: assigned})
      g.add_question(q)
    end
  end
end