class PortalController < ApplicationController
  include InsideController

  layout 'portal'

  def portal
    @user = user
    @information = information
  end

  private

  def information
    UserInformation.(user).information
  end
end
