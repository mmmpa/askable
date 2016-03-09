module PrettyDate
  extend ActiveSupport::Concern

  included do |klass|
    def pretty_date
      created_at.strftime('%Y/%m/%d %H:%M:%S')
    end
  end
end