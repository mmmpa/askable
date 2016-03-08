class QuestionsController < ApplicationController
  rescue_from ActionController::ParameterMissing, with: -> { render json: {errors: {global: 'Invalid'}}, status: 400 }
  rescue_from Question::NotOwner, with: -> { render json: {errors: {global: 'Not Asked'}}, status: 400 }
  rescue_from Question::NotAsked, with: -> { render json: {errors: {global: 'Not Found'}}, status: 400 }
  rescue_from ActiveRecord::RecordNotFound, with: -> { render json: {errors: {global: 'Not Found'}}, status: 400 }
  rescue_from Group::NotMember, with: -> { render json: {errors: {global: 'Not Member'}}, status: 400 }

  def index
    @questions = keeper.q.index.page(page).per(per)
  end

  def opened
    @questions = keeper.q.index.opened.page(page).per(per)
    render :index
  end

  def asked
    @questions = keeper.q.index.asked(user).page(page).per(per)
    render :index
  end

  def requested
    @questions = keeper.q.index.requested(user).page(page).per(per)
    render :index
  end

  def closed
    @questions = keeper.q.index.closed.page(page).per(per)
    render :index
  end

  def show
    @question = question_for_show
    @user = user
    @team = group
  end

  def new
    @user = user
    @team = group
  end

  def create
    q = keeper.q.create!(question_params)
    render json: {id: q.id}, status: 201
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.creation_errors}, status: 400
  end

  def wait
    keeper.q.wait!
    render json: {id: question.id}, status: 201
  end

  def sorry
    keeper.q.sorry!
    render json: {id: question.id}, status: 201
  end

  def assign
    keeper.q.assign!(*assign_params)
    render json: {id: question.id}, status: 201
  end

  def answer
    keeper.q.answer!(answer_params)
    render json: {id: question.id}, status: 201
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.answer_errors}, status: 400
  end

  def reply
    replied = keeper.q.reply_to!(comment, reply_params)
    render json: {id: replied.id}, status: 201
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.answer_errors}, status: 400
  end

  def finish
    keeper.q.finish!
    render nothing: true, status: 201
  end

  private

  def per
    10
  end

  def page
    params[:page] || 1
  end

  def question_for_show
    keeper.q.show.find(params[:question_id])
  end

  def question
    return nil unless params[:question_id]
    Question.find(params[:question_id])
  end

  def comment
    Comment.find(params[:comment_id])
  end

  def user
    UserSession.find.try(:user)
  end

  def group
    Group.find(params[:group_id])
  end

  def keeper
    GroupKeeper.(user: user, group: group, question: question)
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
