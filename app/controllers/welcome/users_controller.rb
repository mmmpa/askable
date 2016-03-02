class Welcome::UsersController < ApplicationController
  layout 'outer'

  def new
  end

  def create
    render json: User.create!(user_params)
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.errors}, status: 400
  end

  private
  def user_params
    params.required(:users).permit(:name, :login, :email, :password)
  end
end
