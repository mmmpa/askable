module MessageUserRelative
  extend ActiveSupport::Concern

  included do
    has_many :received_messages, -> { where { user_own == true }.order { created_at.desc } },
             class_name: Message, inverse_of: :user

    has_many :sent_messages, -> { where { owner_own == true }.order { created_at.desc } },
             class_name: Message, foreign_key: :owner_id, inverse_of: :owner

    scope :messages, ->(viewer) { Message.include { [user, owner] }.where { ((user == viewer) & (user_own == true)) | ((owner == viewer) & (owner_own == true)) }.order { created_at.desc } }

    def messages
      self.class.messages(self)
    end
  end
end