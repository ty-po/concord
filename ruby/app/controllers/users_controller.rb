class UsersController < ApplicationController
  def spotify
    spotify_user = RSpotify::User.new(request.env['omniauth.auth'])
    # Now you can access user's private data, create playlists and much more

    # Access private data
    spotify_user.country #=> "US"
    spotify_user.email   #=> "example@email.com"

    spotify_user.saved_tracks.size #=> 20

    albums = RSpotify::Album.search('launeddas')
    spotify_user.saved_albums.size #=> 10

    # Get user's top played artists and tracks
    spotify_user.top_artists #=> (Artist array)
    spotify_user.top_tracks(time_range: 'short_term') #=> (Track array)

    # Check doc for more
    render json: spotify_user.top_tracks, status: :ok
  end
end
