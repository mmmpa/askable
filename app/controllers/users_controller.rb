class UsersController < ApplicationController
  def new
  end

  def create
    render json: User.create!(user_params)
  rescue ActiveRecord::RecordInvalid => e
    render json: e.record.errors
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private
  def user_params
    params.required(:user).permit(:name, :login, :email, :password)
  end
end
