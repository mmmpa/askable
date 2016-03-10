class InvitationsController < ApplicationController
  include InsideController

  rescue_from ActiveRecord::RecordNotFound, with: -> { render nothing: true, status: 404 }

  def accept
    invitation.accept!
    render nothing: true, status: 201
  end

  def reject
    invitation.reject!
    render nothing: true, status: 201
  end

  def block
    invitation.block!
    render nothing: true, status: 201
  end

  private

  def invitation
    user.invitations.find(params[:invitation_id])
  end
end
