def authlogic_login(user)
    activate_authlogic
    UserSession.create!(user)
    credential = [user.persistence_token, user.id].join('::')

    if self.respond_to?(:cookie)
      cookies['user_credentials'] = credential
    else
      page.driver.set_cookie('user_credentials', credential)
    end
end