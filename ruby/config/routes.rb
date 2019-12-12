Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/auth/spotify/callback', to: 'users#spotify'
  get '/auth/discord/callback', to: 'users#discord'
  get '/auth'                 , to: 'users#index'
  get '/auth/logout'          , to: 'users#logout'
  get '/auth/debug'           , to: 'users#debug'
end
