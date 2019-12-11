class UsersController < ApplicationController
  def spotify
    spotify_response = request.env['omniauth.auth']
    render json: spotify_response, status: :ok
  end

  def discord
    discord_response = request.env['omniauth.auth']
    render json: discord_response, status: :ok
  end
end
