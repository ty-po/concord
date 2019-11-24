Rails.application.routes.draw do
  get 'users/spotify'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/auth/spotify/callback', to: 'users#spotify'
end
