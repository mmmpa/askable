class User < ActiveRecord::Base
  include Askable

  acts_as_authentic do |c|
    c.require_password_confirmation = false
  end
end
