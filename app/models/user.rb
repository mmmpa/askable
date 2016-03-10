class User < ActiveRecord::Base
  include SpecialUser
  include AskUserRelative
  include GroupUserRelative
  include AskableUser

  acts_as_authentic do |c|
    c.require_password_confirmation = false
  end

  validates :name,
            presence: true

  after_create -> { static_mess_bus.tell_after_all(:on_user_created, self) }

  def as_json(options = {})
    super(options.merge!(only: [:name, :login]))
  end
end
