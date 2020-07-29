require 'rspotify/oauth'

Rails.application.config.to_prepare do
  OmniAuth::Strategies::Spotify.include SpotifyOmniauthExtension
end 

Rails.application.config.middleware.use OmniAuth::Builder do
  if Rails.application.credentials.spotify
    provider :spotify, Rails.application.credentials.spotify[:client_id], Rails.application.credentials.spotify[:client_secret], scope: 'user-read-email user-library-read user-modify-playback-state user-top-read playlist-read-private user-read-playback-state user-read-currently-playing user-follow-read streaming user-read-recently-played'
  end
  if Rails.application.credentials.discord
    provider :discord, Rails.application.credentials.discord[:client_id], Rails.application.credentials.discord[:client_secret], scope: 'identify email guilds' # look into whitlist for 'rpc relationships.read activites.read activities.write'
  end
end

