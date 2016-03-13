class StaticBus
  include MessBus::Subscriber
  include Rails.application.routes.url_helpers

  listen :on_user_created

  def on_user_created(user)
    Group.first_group.add_by!(User.system, user)
  end

  def on_assigned(question, *users)
    users.each do |user|
      Message.send_to_by!(User.system, user, assigned_message_params(question))
    end
  end

  def on_all_assignee_responded(question)
    Message.send_to_by!(User.system, question.user, complete_message_params(question))
  end

  private

  def assigned_message_params(question)
    {
      title: "回答を求められています : #{question.title}",
      markdown: (<<-EOS).gsub(/^\s*/, '')
      # システムからのお知らせ

                                        #{question.title}に回答を求められています。

         [いますぐチェック](#{question_path(group_id: question.group.id, question_id: question.id)})
      EOS
    }
  end

  def complete_message_params(question)
    {
      title: "全員の反応がありました。: #{question.title}",
      markdown: (<<-EOS).gsub(/^\s+/, '')
      # システムからのお知らせ

                                  #{question.title}に対する反応が全て帰ってきました。

         [いますぐチェック](#{question_path(group_id: question.group.id, question_id: question.id)})
      EOS
    }
  end
end
