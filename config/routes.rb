Rails.application.routes.draw do
  #
  # 最終行にconstraints失敗時のリダイレクトあり
  #
  scope constraints: Constraint::User.new do
    get '/', to: 'portal#portal', as: :portal

    scope 'i/:invitation_id' do
      patch 'accept', to: 'invitations#accept', as: :accept_invitation
      patch 'reject', to: 'invitations#reject', as: :reject_invitation
      patch 'block', to: 'invitations#block', as: :block_invitation
    end

    scope :g do
      get 'new', to: 'groups#new', as: :new_group
      post 'new', to: 'groups#create'
    end

    scope 'g/:group_id', constraints: Constraint::Group.new do
      get '', to: 'groups#show', as: :group
      post 'invitation', to: 'groups#invite'
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

      scope 'users/me' do
        get '', to: 'users#show', as: :user
        get 'edit', to: 'users#edit', as: :edit_user
        patch 'edit', to: 'users#update'
        delete '', to: 'users#destroy'

        scope :q do
          get 'index', to: 'questions#user_index'
          get 'new', to: 'questions#new', as: :new_question
          post 'new', to: 'questions#create'
        end

        scope :a do
          get 'index', to: 'comments#user_index', as: :comments
        end
      end

      scope 'users/:login' do
        get '', to: 'users#show'
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
