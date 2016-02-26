def authlogic_login(user)
    activate_authlogic
    UserSession.create!(user)
    cookies['user_credentials'] = [user.persistence_token, user.id].join('::')
end