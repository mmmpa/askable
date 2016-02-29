class Comment < ActiveRecord::Base
  belongs_to :user #, inverse_of: :comments
  belongs_to :comment
  has_many :comments
  belongs_to :question, inverse_of: :comments

  before_validation :render_markdown!
  before_destroy :check_not_root_comment

  validates :html, :markdown, :user, :question,
            presence: true

  #after_validation ->{pp self.errors}

  class Renderer < Redcarpet::Render::HTML
    def block_code(code, language)
      Pygments.highlight(code, lexer: language)
    end
  end

  class << self
    attr_accessor :markdown

    def render(*args)
      self.markdown ||= Redcarpet::Markdown.new(Renderer, autolink: true, tables: true, fenced_code_blocks:true)
      markdown.render(*args)
    end
  end

  def check_not_root_comment
    throw CannotDestroyRootComment if root?
  end

  def root?
    question.root?(self)
  end

  def render_markdown!
    return if markdown.nil?
    self.html = self.class.render(markdown)
  end

  class CannotDestroyRootComment < StandardError

  end
end
