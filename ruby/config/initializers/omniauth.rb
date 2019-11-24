require 'rspotify/oauth'

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :spotify, Rails.application.credentials.spotify[:client_id], Rails.application.credentials.spotify[:client_secret], provider_ignores_state: true, scope: 'user-read-email playlist-modify-public user-library-read user-library-modify'
end

