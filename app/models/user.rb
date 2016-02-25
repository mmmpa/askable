class User < ActiveRecord::Base
  #include Askable

  acts_as_authentic do |c|
    c.require_password_confirmation = false
  end

  validates :name,
            presence: true

  def as_json(options)
    super(options.merge!(only: [:name, :login, :email]))
  end
end
