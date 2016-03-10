class StaticBus
  include MessBus::Subscriber

  listen :on_user_created

  def on_user_created(user)
    Group.first_group.add_by!(User.system, user)
  end

  def on_all_assignee_responded(question, user)
    pp "全て反応が帰ってきました", question
  end
end
