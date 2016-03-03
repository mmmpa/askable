class UserSessionsController < ApplicationController
  layout 'outer'

  def new
  end

  def create
    UserSession.create!(session_params)
    render nothing: true, status: 201
  rescue
    render nothing: true, status: 401
  end

  def destroy
    UserSession.find.try(:destroy)
    render nothing: true, status: 201
  end

  private
  def session_params
    params.required(:user_sessions).permit(:login, :password)
  end
end
