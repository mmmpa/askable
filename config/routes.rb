Rails.application.routes.draw do
  scope :in do
    get '', to: 'user_sessions#new', as: :log_in
    post '', to: 'user_sessions#create'
  end

  scope :out do
    delete '', to: 'user_sessions#destroy', as: :log_out
  end

  namespace :welcome do
    get 'new', to: 'users#new', as: :new_user
    post 'new', to: 'users#create'
  end

  scope :q do
    get 'index', to: 'questions#index'

    scope ':question_id' do
      get '', to: 'questions#show', as: :question
      patch 'sorry', to: 'questions#sorry'
      patch 'assign', to: 'questions#assigned'
      patch 'answer', to: 'questions#answer'

      scope :a do
        get 'new', to: 'comments#new'
        post 'new', to: 'comments#create'

        scope ':comment_id' do
          get 'res', to: 'comments#res'
          post 'res', to: 'comments#reply'
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
        get 'index', to: 'questions#user_index', as: :questions
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


  get '/', to: 'portal#portal', as: :portal
end
