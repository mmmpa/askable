class QuestionsController < ApplicationController
  rescue_from ActionController::ParameterMissing, with: -> { render json: {errors: {}}, status: 400 }
  rescue_from Question::NotOwner, with: -> { render json: {errors: {}}, status: 400 }

  def index
    @questions = Question.index(user).page(page).per(per)
  end

  def opened
    @questions = Question.index(user).opened.page(page).per(per)
    render :index
  end

  def asked
    @questions = Question.index(user).asked(user).page(page).per(per)
    render :index
  end

  def requested
    @questions = Question.index(user).requested(user).page(page).per(per)
    render :index
  end

  def closed
    @questions = Question.index(user).closed.page(page).per(per)
    render :index
  end

  def show
    @question = question_for_show
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
    question.wait_by!(user)
    render json: {id: question.id}, status: 201
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.errors}, status: 400
  end

  def sorry
    question.sorry_by!(user)
    render json: {id: question.id}, status: 201
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: {}}, status: 400
  end

  def assign
    question.assign_by!(user, *assign_params)
    render json: {id: question.id}, status: 201
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.assign_errors}, status: 400
  end

  def answer
    question.answer_by!(user, answer_params)
    render json: {id: question.id}, status: 201
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.answer_errors}, status: 400
  end

  def reply
    replied = question.reply_to_by!(user, comment, reply_params)
    render json: {id: replied.id}, status: 201
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.answer_errors}, status: 400
  end

  def finish
    question.finish_by!(user)
    render nothing: true, status: 201
  rescue Question::NotOwner => e
    render json: {errors: {}}, status: 400
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: {}}, status: 400
  end

  private

  def per
    10
  end

  def page
    params[:page] || 1
  end

  def question_for_show
    Question.show.find(params[:question_id])
  end

  def question
    Question.find(params[:question_id])
  end

  def comment
    Comment.find(params[:comment_id])
  end

  def user
    UserSession.find.try(:user)
  end

  def team
    []
  end

  def reply_params
    params.require(:questions).permit(:markdown)
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
