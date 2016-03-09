class Constraint::Group < Constraint::User
  def matches?(request)
    group(request).member?(user(request)) rescue false
  end

  def group(request)
    RequestStore.store[:current_group] = Group.find(request.params[:group_id]) rescue nil
  end
end