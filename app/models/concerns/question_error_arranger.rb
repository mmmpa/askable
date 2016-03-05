module QuestionErrorArranger
  extend ActiveSupport::Concern

  included do |klass|
    def creation_errors
      base = errors.messages
      base.delete(:comments)
      if (markdown_error = comments.last.errors.messages[:markdown])
        base.merge!(markdown: markdown_error)
      end
      base
    end

    def answer_errors
      base = {}
      if (markdown_error = comments.last.errors.messages[:markdown])
        base.merge!(markdown: markdown_error)
      end
      base
    end

    def assign_errors
      errors
    end
  end
end