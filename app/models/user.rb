class User < ActiveRecord::Base
  include SpecialUser
  include AskUserRelative
  include GroupUserRelative
  include AskableUser

  attr_accessor :password_now

  acts_as_authentic do |c|
    c.require_password_confirmation = false
  end

  validates :name,
            presence: true

  validates :password,
            presence: true,
            if: -> { password_now.present? }

  after_create -> { static_mess_bus.tell_after_all(:on_user_created, self) }

  def as_json(options = {})
    super(options.merge!(only: [:name, :login]))
  end

  def update_password!(params)
    self.password_now = params[:password_now]
    unless valid_password?(password_now)
      errors.add(:password_now, :invalid)
      raise ActiveRecord::RecordInvalid, self
    end

    self.password = params[:password]
    save!
  end
end
