Rails.application.routes.draw do
  #
  # 最終行にconstraints失敗時のリダイレクトあり
  #
  scope constraints: Constraint::User.new do
    get '/', to: redirect('/q/index')
    #get '/', to: 'portal#portal', as: :portal
    delete 'out', to: 'user_sessions#destroy'

    scope :out do
      delete '', to: 'user_sessions#destroy', as: :log_out
    end

    scope :q do
      get 'index', to: 'questions#index', as: :questions
      get 'index/opened', to: 'questions#opened', as: :opened_questions
      get 'index/asked', to: 'questions#asked', as: :asked_questions
      get 'index/requested', to: 'questions#requested', as: :requested_questions
      get 'index/closed', to: 'questions#closed', as: :closed_questions

      scope ':question_id' do
        get '', to: 'questions#show', as: :question
        patch 'sorry', to: 'questions#sorry', as: :sorry_question
        patch 'assign', to: 'questions#assign', as: :assign_question
        patch 'answer', to: 'questions#answer', as: :answer_question
        patch 'wait', to: 'questions#wait', as: :wait_question

        scope :a do
          get 'new', to: 'comments#new'
          post 'new', to: 'comments#create'

          scope ':comment_id' do
            get 'res', to: 'questions#res'
            post 'res', to: 'questions#reply'
          end
        end
      end
    end

    scope :users do
      scope :me do
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

      scope ':login' do
        get '', to: 'users#show'
      end
    end

    get '/', to: redirect('/q/index')
    get '*path', to: redirect('/q/index')
  end

  namespace :welcome do
    get 'new', to: 'users#new', as: :new_user
    post 'new', to: 'users#create'
  end

  scope :in do
    get '', to: 'user_sessions#new', as: :log_in
    post '', to: 'user_sessions#create'
  end

  get '/', to: redirect('/in')
  get '*path', to: redirect('/in')
end
