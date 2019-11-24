require 'rspotify/oauth'

Rails.application.config.to_prepare do
  OmniAuth::Strategies::Spotify.include SpotifyOmniauthExtension
end 

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :spotify, Rails.application.credentials.spotify[:client_id], Rails.application.credentials.spotify[:client_secret], provider_ignores_state: true, scope: 'user-read-email user-library-read user-modify-playback-state user-top-read playlist-read-private user-read-playback-state user-read-currently-playing user-follow-read streaming user-read-recently-played'
end

