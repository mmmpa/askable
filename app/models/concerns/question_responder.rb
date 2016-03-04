module QuestionResponder
  extend ActiveSupport::Concern

  included do
    def ask_for(target)
      ask_users.not_yet.where { user == target }.first
    end

    def finish_ask(asked_user, reaction)
      target_ask = ask_for(asked_user)
      return unless target_ask

      target_ask.send(reaction)
    end

    def sorry_by!(user)
      finish_ask(user, :responded!)
    end

    def wait_by!(user)
      finish_ask(user, :wait!)
    end

    def assign_by!(user, *assigned)
      if assigned.nil? || assigned.size == 0
        errors.add(:assigned, :at_least_one_assignee)
        raise ActiveRecord::RecordInvalid, self
      end

      assign!(*assigned)
      finish_ask(user, :assigned!)
    end

    def answer_by!(user, new_comment)
      comment = detect_comment(new_comment)
      comment.user = user
      reply_to!(root, comment)
      finish_ask(user, :answered!)
    end

    def reply_to_by!(user, replied, reply_params)
      raise NotInTree unless comments.include?(replied)
      reply = detect_comment(reply_params)
      reply.user = user
      reply.comment = detect_reply_target(replied)
      comments << reply
      save!
      reply
    end

    def reply_to!(replied, new_comment)
      comment = detect_comment(new_comment)
      comment.comment = detect_reply_target(replied)
      comments << new_comment
      save!
    end
  end
end