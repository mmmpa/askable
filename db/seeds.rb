begin
  User.new(login: 'a', name: 'system', password: SecureRandom.uuid, email: 'a').save(validate: false)
  User.new(login: 'b', name: 'information', password: SecureRandom.uuid, email: 'b').save(validate: false)
  User.new(login: 'c', name: 'error', password: SecureRandom.uuid, email: 'c').save(validate: false)
  User.new(login: 'd', name: 'invitation', password: SecureRandom.uuid, email: 'd').save(validate: false)
rescue => e
  p "Users are already initialized, or #{e}"
end

if Group.where { user == User.system }.size == 0
  Group.create(user: User.system, name: 'はじめてのグループ', description: '最初に招待されるグループです。必要がなければリムーブしてください。')
else
  p 'Groups are already initialized.'
end

if ENV['DEV_DATA']
  #Message.destroy_all

  User.all.each do |user|
    user.destroy unless user.system?
  end

  Group.all.each do |group|
    group.destroy unless group.user.try(:system?)
  end

  GroupUser.all.each do |group|
    group.destroy unless group.user.try(:system?)
  end

  Question.destroy_all

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
      description: "デスクリプショん #{SecureRandom.uuid} #{SecureRandom.uuid}"
    )

    2.times do
      g.add_by!(owner, user_sample) rescue nil
    end

    GroupUser.where { group == g }.each(&:accepted!)

    question_numbers[index].times do |n|
      owner = g.users.sample
      assigned = g.users.sample(n - 1)
      GroupKeeper.(group: g, user: owner).q.create!({title: n.to_s, markdown: "# title", assigned: assigned})
    end

    g = Group.create!(
      name: "no_member_group_name_#{name}",
      user: owner,
      description: "デスクリプショん #{SecureRandom.uuid} #{SecureRandom.uuid}"
    )
  end
end

def user_sample(*args)
  User.normal.sample(*args)
end
