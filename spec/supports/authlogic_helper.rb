def authlogic_login(user)
  activate_authlogic
  UserSession.create!(user)
  credential = [user.persistence_token, user.id].join('::')

  begin
    cookies['user_credentials'] = credential
  rescue
    page.driver.set_cookie('user_credentials', credential)
  end
end