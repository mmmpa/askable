module SpecialGroup
  extend ActiveSupport::Concern

  included do |klass|
    class << klass
      def first_group
        find_by(user: User.system)
      end
    end
  end
end