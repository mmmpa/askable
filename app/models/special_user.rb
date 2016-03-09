class SpecialUser
  class << self
    def system
      User.find_by(login: 'a')
    end

    def information
      User.find_by(login: 'b')
    end

    def error
      User.find_by(login: 'c')
    end

    def invitation
      User.find_by(login: 'd')
    end

    def deleted
      User.find_by(login: 'z')
    end
  end
end