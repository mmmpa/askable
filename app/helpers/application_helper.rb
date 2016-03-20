module ApplicationHelper
  def detect_respond_icon(state)
    case state
      when AskUser.states[:answered]
        %q{<i class="fa fa-answered"></i>}.html_safe
      when AskUser.states[:responded]
        %q{<i class="fa fa-sorryed"></i>}.html_safe
      when AskUser.states[:assigned]
        %q{<i class="fa fa-assigned"></i>}.html_safe
      when AskUser.states[:waited]
        %q{<i class="fa fa-waited"></i>}.html_safe
      else
        nil
    end
  end

  def write_group_table(&block)
    ->(group){
      capture(group, &block)
    }
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
    case
      when q.closed?
        'fa-closed'
      when q.assigned?(user)
        'fa-assigned'
      when q.all_responded?
        'fa-all-responded'
      else
        'fa-opened'
    end
  end
end
