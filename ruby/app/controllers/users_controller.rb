module UsersHelper
  def asdf(asdf)
    asdf
  end
end

class UsersController < ApplicationController
  def spotify
    spotify_response = request.env['omniauth.auth']

    current_user = User.find_by_id(session[:current_user_id])
    if current_user
    else

    auth = AuthProvider.find_by(provider: Model.provider[:spotify], uid: spotify_response.uid
    if auth
    else
  end

  def discord
    discord_response = request.env['omniauth.auth']
    render json: discord_response, status: :ok
  end
end
