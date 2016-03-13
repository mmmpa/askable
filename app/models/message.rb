class Message < ActiveRecord::Base
  include PrettyDate
  include MarkdownRenderer

  belongs_to :user, inverse_of: :received_messages
  belongs_to :owner, class_name: User, foreign_key: :owner_id, inverse_of: :sent_messages

  validates :user, :owner, :title, :html, :markdown,
            presence: true

  class << self
    def send_to_by!(sender, receiver, message_params)
      create!(message_params.merge(user: receiver, owner: sender))
    end
  end

  def dispose!(target)
    case
      when target == user
        self.user_own = false
      when target == owner
        self.owner_own = false
      else
        raise NotOwner
    end

    still_owned? ? save! : destroy!
  end

  def still_owned?
    owner_own || user_own
  end

  class NotOwner < StandardError
  end
end

# == Schema Information
#
# Table name: messages
#
#  created_at :datetime         not null
#  html       :text             not null
#  id         :integer          not null, primary key
#  markdown   :text             not null
#  owner_id   :integer          not null
#  owner_own  :boolean          default(TRUE), not null
#  title      :string           not null
#  updated_at :datetime         not null
#  user_id    :integer          not null
#  user_own   :boolean          default(TRUE), not null
#
# Indexes
#
#  index_messages_on_owner_id  (owner_id)
#  index_messages_on_user_id   (user_id)
#
