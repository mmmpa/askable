class Welcome::UsersController < ApplicationController
  layout 'outer'

  def new
  end

  def create
    user = User.create!(user_params)
    render json: {
      login: user.login,
      name: user.name,
      email: user.email
    }, status: 201
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.errors}, status: 400
  end

  private
  def user_params
    params.required(:users).permit(:name, :login, :email, :password)
  end
end
