class PortalController < ApplicationController
  include InsideController

  layout 'portal'

  def portal
    @user = user
    @information = []
  end
end
