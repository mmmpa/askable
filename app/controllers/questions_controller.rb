class QuestionsController < ApplicationController
  def new
    @user = user
    @team = {users: User.all}
  end

  def create
    q = Question.create_by!(user, question_params)
    render json: {id: q.id}, status: 201
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.errors}, status: 400
  end

  private
  def user
    UserSession.find.try(:user)
  end

  def team
    []
  end

  def question_params
    params.require(:questions).permit(:title, :markdown, assigned: [])
  end
end
