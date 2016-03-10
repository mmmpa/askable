module AskableUser
  extend ActiveSupport::Concern

  included do |klass|
    after_create -> { static_mess_bus.tell(:on_user_created, self) }
  end
end