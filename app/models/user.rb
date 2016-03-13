class User < ActiveRecord::Base
  include SpecialUser
  include AskUserRelative
  include GroupUserRelative
  include MessageUserRelative
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

# == Schema Information
#
# Table name: users
#
#  created_at          :datetime         not null
#  crypted_password    :string           not null
#  email               :string           not null
#  id                  :integer          not null, primary key
#  login               :string           not null
#  name                :string           not null
#  new_email           :string
#  new_email_token     :string
#  password_salt       :string           not null
#  perishable_token    :string
#  persistence_token   :string
#  single_access_token :string
#  updated_at          :datetime         not null
#
# Indexes
#
#  index_users_on_email            (email) UNIQUE
#  index_users_on_login            (login) UNIQUE
#  index_users_on_new_email        (new_email) UNIQUE
#  index_users_on_new_email_token  (new_email_token) UNIQUE
#
