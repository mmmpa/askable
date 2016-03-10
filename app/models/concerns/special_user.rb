module SpecialUser
  extend ActiveSupport::Concern

  included do |klass|
    class << klass
      def system
        find_by(login: 'a')
      end

      def information
        find_by(login: 'b')
      end

      def error
        find_by(login: 'c')
      end

      def invitation
        find_by(login: 'd')
      end

      def deleted
        find_by(login: 'z')
      end
    end

    def system?
      login == 'a'
    end
  end
end