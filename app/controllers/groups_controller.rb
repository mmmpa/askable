class GroupsController < ApplicationController
  include InsideController

  rescue_from Group::NotOwner,
              with: -> { render json: {errors: {any: ['グループオーナーではありません']}}, status: 403 }

  def show
    @user = user
    @group = group
  end

  def new
    render layout: 'portal'
  end

  def create
    g = Group.create_by!(user, group_params)
    render json: {id: g.id}, status: 201
  rescue ActiveRecord::RecordInvalid => e
    render json: {errors: e.record.errors.messages}, status: 400
  end

  def invite
    group.invite_by!(user, invite_params)
    render nothing: true, status: 201
  rescue Group::AlreadyInvited
    render json: {errors: {any: ['すでに招待済みです']}}, status: 403
  rescue ActiveRecord::RecordNotFound
    render json: {errors: {any: ['ユーザーが見つかりません']}}, status: 404
  end

  def destroy
    group.dispose_by!(user)
    render nothing: true, status: 201
  end

  private

  def invite_params
    params.require(:invitations).permit(:login)
  end

  def group_params
    params.require(:groups).permit(:name, :description)
  end
end
