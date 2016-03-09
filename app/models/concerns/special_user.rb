module SpecialUser
  extend ActiveSupport::Concern

  included do |klass|
    class << klass
      def system
        klass.find_by(login: 'a')
      end

      def information
        klass.find_by(login: 'b')
      end

      def error
        klass.find_by(login: 'c')
      end

      def invitation
        klass.find_by(login: 'd')
      end

      def deleted
        klass.find_by(login: 'z')
      end
    end

    def system?
      login == 'a'
    end
  end
end