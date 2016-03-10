class Comment < ActiveRecord::Base
  include PrettyDate

  attr_accessor :use_raw

  belongs_to :user, inverse_of: :comments
  belongs_to :comment
  has_many :comments
  belongs_to :question, inverse_of: :comments

  before_validation :render_markdown!
  before_destroy :check_not_root_comment

  validates :html, :markdown, :user, :question,
            presence: true

  #after_validation ->{pp self.errors}

  scope :with_author, -> { joins { user }.select { ["comments.*", user.name.as(:as_author_name)] } }

  class Renderer < Redcarpet::Render::HTML
    def block_code(code, language)
      Pygments.highlight(code, lexer: language)
    end
  end

  class << self
    attr_accessor :markdown

    def render(*args)
      self.markdown ||= Redcarpet::Markdown.new(Renderer, autolink: true, tables: true, fenced_code_blocks: true)
      markdown.render(*args)
    end
  end

  def author_name
    respond_to?(:as_author_name) ? as_author_name : user.name
  end

  def check_not_root_comment
    question.destroyed?
    raise CannotDestroyRootComment if root?
  end

  def root?
    question.root?(self)
  end

  def render_markdown!
    return if markdown.nil?
    self.html = !!use_raw ? markdown : self.class.render(markdown)
  end

  class CannotDestroyRootComment < StandardError

  end
end
