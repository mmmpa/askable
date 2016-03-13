module MarkdownRenderer
  extend ActiveSupport::Concern

  included do |klass|
    attr_accessor :use_raw

    before_validation :render_markdown!

    class << klass
      attr_accessor :markdown

      def render(*args)
        self.markdown ||= Redcarpet::Markdown.new(Renderer, autolink: true, tables: true, fenced_code_blocks: true)
        markdown.render(*args)
      end
    end

    def render_markdown!
      return if markdown.nil?
      self.html = !!use_raw ? markdown : self.class.render(markdown)
    end

    class Renderer < Redcarpet::Render::HTML
      def block_code(code, language)
        Pygments.highlight(code, lexer: language)
      end
    end
  end
end