class UsersController < ApplicationController
  include InsideController
  layout 'portal'

  def edit
    @user_info = {
      login: user.login,
      name: user.name,
      email: user.email
    }
  end
end
