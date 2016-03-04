module ApplicationHelper
  def detect_respond_icon(state)
    p state
    case state
      when AskUser.status[:answered]
        %{<i class="fa fa-thumbs-o-up"></i>}.html_safe
      when AskUser.status[:responded]
        %{<i class="fa fa-paw"></i>}.html_safe
      when AskUser.status[:assigned]
        %{<i class="fa fa-group"></i>}.html_safe
      when AskUser.status[:wait]
        %{<i class="fa fa-clock-o"></i>}.html_safe
      else
        nil
    end
  end

  def write_comment_tree(tree, root, &block)
    base = capture(root, &block)
    children = write_comment_child(tree, [root], tree[root.id], &block)
    base + children
  end

  def write_comment_child(tree, parents, children, &block)
    return '' if children.nil?
    children.map { |child|
      %{<div class="wrap">#{capture(child, parents.first, parents, &block)}</div>} + write_comment_child(tree, parents + [child], tree[child.id], &block)
    }.join.html_safe
  end

  def detect_index_tab_selected(path)
    request.fullpath == path ? 'selected' : ''
  end

  def detect_question_index_icon(q, user)
    return 'fa-hand-o-right assigned' if q.assigned?(user)
    return 'fa-smile-o all-responded' if q.all_responded?
    q.opened? ? 'fa-meh-o opened' : 'fa-smile-o closed'
  end
end
