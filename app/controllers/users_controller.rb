class UsersController < ApplicationController
  include InsideController
  layout 'portal'

  def edit
    @user_info = user_info
  end

  def update
    user.update!(user_params)
    render json: user_info, status: 201
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.errors.messages}, status: 400
  end

  def update_password
    user.update_password!(password_params)
    render nothing: true, status: 201
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.errors.messages}, status: 400
  end

  def destroy
    user.destroy!
    render nothing: true, status: 201
  rescue ActiveRecord::RecordNotDestroyed
    render nothing: true, status: 400
  end

  private

  def user_info
    {
      login: user.login,
      name: user.name,
      email: user.email
    }
  end

  def password_params
    params.require(:users).permit(:password, :password_now)
  end

  def user_params
    params.require(:users).permit(:login, :name, :email)
  end
end
