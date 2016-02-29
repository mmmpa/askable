class QuestionsController < ApplicationController
  def index
    @questions = Question.order { created_at.desc }.all
  end

  def show
    @question = question
    @user = user
    @team = {users: User.all}
  end

  def new
    @user = user
    @team = {users: User.all}
  end

  def create
    q = Question.create_by!(user, question_params)
    render json: {id: q.id}, status: 201
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.creation_errors}, status: 400
  end

  def wait
    question.wait_by(user)
    render json: {id: question.id}, status: 201
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.errors}, status: 400
  end

  def sorry
    question.sorry_by(user)
    render json: {id: question.id}, status: 201
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: {}}, status: 400
  end

  def assign
    question.assign_by(user, *assign_params)
    render json: {id: question.id}, status: 201
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.assign_errors}, status: 400
  end

  def answer
    question.answer_by(user, answer_params)
    render json: {id: question.id}, status: 201
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.answer_errors}, status: 400
  end

  def reply

  end

  private
  def question
    Question.find(params[:question_id])
  end

  def user
    UserSession.find.try(:user)
  end

  def team
    []
  end

  def assign_params
    params.require(:questions).permit(assigned: [])[:assigned]
  end

  def answer_params
    params.require(:questions).permit(:markdown)
  end

  def question_params
    params.require(:questions).permit(:title, :markdown, assigned: [])
  end
end
