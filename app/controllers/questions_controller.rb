class QuestionsController < ApplicationController
  include InsideController

  rescue_from ActionController::ParameterMissing, with: -> { render json: {errors: {global: 'Invalid'}}, status: 400 }
  rescue_from Question::NotOwner, with: -> { render json: {errors: {global: 'Not Asked'}}, status: 400 }
  rescue_from Question::NotAsked, with: -> { render json: {errors: {global: 'Not Found'}}, status: 400 }
  rescue_from ActiveRecord::RecordNotFound, with: -> { render json: {errors: {global: 'Not Found'}}, status: 400 }
  rescue_from Group::NotMember, with: -> { render json: {errors: {global: 'Not Member'}}, status: 400 }

=begin
  before_action -> {
    mess_bus.listen('end', ->(message) { pp message })
    mess_bus.tell(:on_user_created)
    static_mess_bus.tell_after_all(:on_user_created)
  }

  after_action -> {
    mess_bus.tell('end', '終わったよ')
  }
=end
  def index
    @questions = keeper.q.index.page(page).per(per)
    penetrate { notify '反応が反映されました' }
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
  end

  def new
  end

  def create
    q = keeper.q.create!(question_params)
    penetrate { notify '問題を作成しました' }
    render json: {id: q.id}, status: 201
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.creation_errors}, status: 400
  end

  def wait
    keeper.q.wait!
    penetrate { notify '反応が反映されました' }
    render json: {id: question.id}, status: 201
  end

  def sorry
    keeper.q.sorry!
    penetrate { notify '反応が反映されました' }
    render json: {id: question.id}, status: 201
  end

  def assign
    keeper.q.assign!(*assign_params)
    penetrate { notify '回答者が追加されました' }
    render json: {id: question.id}, status: 201
  end

  def answer
    keeper.q.answer!(answer_params)
    penetrate { notify '回答が投稿されました' }
    render json: {id: question.id}, status: 201
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.answer_errors}, status: 400
  end

  def reply
    replied = keeper.q.reply_to!(comment, reply_params)
    penetrate { notify '返信が投稿されました' }
    render json: {id: replied.id}, status: 201
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.answer_errors}, status: 400
  end

  def finish
    keeper.q.finish!
    penetrate { notify '回答の受付を終了しました' }
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
