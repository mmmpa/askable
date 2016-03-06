module QuestionResponder
  extend ActiveSupport::Concern

  included do
    def finish_by!(owner)
      raise Question::NotOwner unless owner?(owner)
      closed!
    end

    def assign!(*assigned)
      self.class.call_assigned(*assigned).each { |user| users << user }
      save!
    end

    def add_comment!(comment)
      comments << comment
      save!
    end

    def ask_for(target)
      ask_users.not_yet.where { user == target }.first
    end

    def finish_ask!(asked_user, reaction)
      touch
      target_ask = ask_for(asked_user)
      raise Question::NotAsked unless target_ask

      target_ask.send(reaction)
    end

    def finish_ask(asked_user, reaction)
      touch
      target_ask = ask_for(asked_user)
      return unless target_ask

      target_ask.send(reaction)
    end

    def sorry_by!(user)
      finish_ask!(user, :responded!)
    end

    def wait_by!(user)
      finish_ask!(user, :wait!)
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
      reply = reply_to_by!(user, root, new_comment)
      finish_ask(user, :answered!)
      reply
    end

    def reply_to_by!(user, replied, reply_params)
      replied_comment = detect_reply_target(replied)
      raise Question::NotInTree unless comments.include?(replied_comment)
      reply = detect_comment(reply_params)
      reply.user = user
      reply.comment = replied_comment
      comments << reply
      save!
      reply
    end
  end
end
