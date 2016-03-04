module AsColumnWrapper
  def as_or(name, &block)
    as_name = "as_#{name}"
    respond_to?(as_name) ? send(as_name) : block.()
  end
end