class Constraint::User
  def matches?(request)
    !!user(request)
  end

  def user(request)
    UserSession.controller = ControllerLike.new(request)
    RequestStore.store[:curent_user] = UserSession.find.try(:user).tap{ UserSession.controller = nil }
  end

  class ControllerLike
    def initialize(request)
      @request = request
    end

    def cookies
      @request.cookies
    end

    def params
      @request.params
    end

    def session
      @request.session
    end

    def method_missing(*args)
      false
    end
  end
end