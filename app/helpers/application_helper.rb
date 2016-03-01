module ApplicationHelper
  def detect_respond_icon(state)
    p state
    case state
      when AskUser.status[:answered]
        %{<i class="fa fa-thumbs-o-up"></i>}.html_safe
      when AskUser.status[:responded]
        %{<i class="fa fa-paw"></i>}.html_safe
      when AskUser.status[:assigned]
        %{<i class="fa fa-groups"></i>}.html_safe
      when AskUser.status[:wait]
        %{<i class="fa fa-clock-o"></i>}.html_safe
      else
        nil
    end
  end
end
