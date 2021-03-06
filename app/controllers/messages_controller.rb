class MessagesController < ApplicationController
  include InsideController

  layout 'portal'

  rescue_from ActiveRecord::RecordNotFound, with: -> { render nothing: true, status: 404 }

  def index
    @messages = user.received_messages.all
  end

  def show
    @message = message
  end

  def destroy
    message.destroy!
    render nothing: true, status: 201
  rescue
    render nothing: true, status: 400
  end

  private

  def message
    user.received_messages.find(params[:message_id])
  end
end
