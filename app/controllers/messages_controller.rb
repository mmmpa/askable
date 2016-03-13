class MessagesController < ApplicationController
  include InsideController

  layout 'portal'

  def index
    @messages = user.received_messages.all
  end

  def show
    @message = message
  end

  def destroy
  end

  private

  def message
    user.received_messages.find(params[:message_id])
  end
end
