# == Route Map
#
#              Prefix Verb   URI Pattern                                             Controller#Action
#              portal GET    /                                                       portal#portal
#   accept_invitation PATCH  /i/:invitation_id/accept(.:format)                      invitations#accept
#   reject_invitation PATCH  /i/:invitation_id/reject(.:format)                      invitations#reject
#    block_invitation PATCH  /i/:invitation_id/block(.:format)                       invitations#block
#           new_group GET    /g/new(.:format)                                        groups#new
#                 new POST   /g/new(.:format)                                        groups#create
#           edit_user GET    /me(.:format)                                           users#edit
#                     PATCH  /me(.:format)                                           users#update
#     change_password PATCH  /me/password(.:format)                                  users#update_password
#                     DELETE /me(.:format)                                           users#destroy
#               group GET    /g/:group_id(.:format)                                  groups#show
#          invitation POST   /g/:group_id/invitation(.:format)                       groups#invite
#                     DELETE /g/:group_id(.:format)                                  groups#destroy
#              remove DELETE /g/:group_id/remove(.:format)                           groups#remove
#        group_portal GET    /g/:group_id/q/index/opened(.:format)                   questions#opened
#           questions GET    /g/:group_id/q/index(.:format)                          questions#index
#    opened_questions GET    /g/:group_id/q/index/opened(.:format)                   questions#opened
#     asked_questions GET    /g/:group_id/q/index/asked(.:format)                    questions#asked
# requested_questions GET    /g/:group_id/q/index/requested(.:format)                questions#requested
#    closed_questions GET    /g/:group_id/q/index/closed(.:format)                   questions#closed
#            question GET    /g/:group_id/q/:question_id(.:format)                   questions#show
#      sorry_question PATCH  /g/:group_id/q/:question_id/sorry(.:format)             questions#sorry
#     assign_question PATCH  /g/:group_id/q/:question_id/assign(.:format)            questions#assign
#     answer_question PATCH  /g/:group_id/q/:question_id/answer(.:format)            questions#answer
#       wait_question PATCH  /g/:group_id/q/:question_id/wait(.:format)              questions#wait
#     finish_question PATCH  /g/:group_id/q/:question_id/finish(.:format)            questions#finish
#                     GET    /g/:group_id/q/:question_id/a/new(.:format)             comments#new
#                     POST   /g/:group_id/q/:question_id/a/new(.:format)             comments#create
#                 res GET    /g/:group_id/q/:question_id/a/:comment_id/res(.:format) questions#res
#      reply_question POST   /g/:group_id/q/:question_id/a/:comment_id/res(.:format) questions#reply
#        new_question GET    /g/:group_id/me/q/new(.:format)                         questions#new
#                     POST   /g/:group_id/me/q/new(.:format)                         questions#create
#                     GET    /g/:group_id(.:format)                                  redirect(301, path: /g/%{group_id}/q/index)
#                     GET    /*path(.:format)                                        redirect(301, /)
#    welcome_new_user GET    /welcome/new(.:format)                                  welcome/users#new
#         welcome_new POST   /welcome/new(.:format)                                  welcome/users#create
#              log_in GET    /in(.:format)                                           user_sessions#new
#                     POST   /in(.:format)                                           user_sessions#create
#             log_out DELETE /out(.:format)                                          user_sessions#destroy
#                     GET    /                                                       redirect(301, /in)
#                     GET    /*path(.:format)                                        redirect(301, /in)
#

Rails.application.routes.draw do
  #
  # 最終行にconstraints失敗時のリダイレクトあり
  #
  scope constraints: Constraint::User.new do
    get '/', to: 'portal#portal', as: :portal

    scope 'me' do
      get '', to: 'users#edit', as: :edit_user
      patch '', to: 'users#update'
      patch 'password', to: 'users#update_password', as: :change_password
      delete '', to: 'users#destroy'
    end

    scope 'i/:invitation_id' do
      patch 'accept', to: 'invitations#accept', as: :accept_invitation
      patch 'reject', to: 'invitations#reject', as: :reject_invitation
      patch 'block', to: 'invitations#block', as: :block_invitation
    end

    scope :g do
      get 'new', to: 'groups#new', as: :new_group
      post 'new', to: 'groups#create'
    end

    scope :m do
      get 'index', to: 'messages#index', as: :messages
      get ':message_id', to: 'messages#show', as: :message
      delete ':message_id', to: 'messages#destroy'
    end

    scope 'g/:group_id', constraints: Constraint::Group.new do
      get '', to: 'groups#show', as: :group
      post 'invitation', to: 'groups#invite', as: :new_invitation
      delete '', to: 'groups#destroy'
      delete 'remove', to: 'groups#remove'

      scope :q do
        get 'index/opened', to: 'questions#opened', as: :group_portal
        get 'index', to: 'questions#index', as: :questions
        get 'index/opened', to: 'questions#opened', as: :opened_questions
        get 'index/asked', to: 'questions#asked', as: :asked_questions
        get 'index/requested', to: 'questions#requested', as: :requested_questions
        get 'index/closed', to: 'questions#closed', as: :closed_questions
      end

      scope 'q/:question_id' do
        get '', to: 'questions#show', as: :question
        patch 'sorry', to: 'questions#sorry', as: :sorry_question
        patch 'assign', to: 'questions#assign', as: :assign_question
        patch 'answer', to: 'questions#answer', as: :answer_question
        patch 'wait', to: 'questions#wait', as: :wait_question
        patch 'finish', to: 'questions#finish', as: :finish_question

        scope :a do
          get 'new', to: 'comments#new'
          post 'new', to: 'comments#create'
        end

        scope 'a/:comment_id' do
          get 'res', to: 'questions#res'
          post 'res', to: 'questions#reply', as: :reply_question
        end
      end

      scope 'me' do
        scope :q do
          get 'new', to: 'questions#new', as: :new_question
          post 'new', to: 'questions#create'
        end
      end

      get '/', to: redirect(path: '/g/%{group_id}/q/index')
    end

    get '*path', to: redirect('/')
  end

  namespace :welcome do
    get 'new', to: 'users#new', as: :new_user
    post 'new', to: 'users#create'
  end

  scope :in do
    get '', to: 'user_sessions#new', as: :log_in
    post '', to: 'user_sessions#create'
  end

  delete 'out', to: 'user_sessions#destroy', as: :log_out

  get '/', to: redirect('/in')
  get '*path', to: redirect('/in')
end
