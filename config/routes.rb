Rails.application.routes.draw do

  namespace :welcome do
    get 'new', to: 'users#new', as: :new_user
    post 'new', to: 'users#create'

  end

  scope :users do
    scope :me do
      get '', to: 'users#show', as: :user
      get 'edit', to: 'users#edit', as: :edit_user
      patch 'edit', to: 'users#update'
      delete '', to: 'users#destroy'
    end

    scope ':login' do
      get '', to: 'users#show'
    end
  end
end
