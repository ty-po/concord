module UsersHelper
  def asdf(asdf)
    asdf
  end
end

class UsersController < ApplicationController
  def spotify
    oauth_response = request.env['omniauth.auth']

    user = User.find_by_id(session[:user_id])
    auth = AuthProvider.find_by(provider: AuthProvider.providers[:spotify], uid: oauth_response.uid)
    if user && auth
      #then we are logged on already and authed; show my credentials maybe
    elsif user && !auth
      auth = AuthProvider.create(auth: oauth_response, user_id: user.id, provider: AuthProvider.providers[:spotify], uid: oauth_response.uid)
      #then we are logged on but not authed with this provider/account; create new auth provider, add/override onto user
    elsif !user && auth
      user = User.find_by_id(auth.user_id)
      session[:user_id] = user.id
      #then we are logged out but have an account already associated; log me in and set session
    elsif !user && !auth
      user = User.create(username: oauth_response.uid)
      session[:user_id] = user.id

      auth = AuthProvider.create(auth: oauth_response, user_id: user.id, provider: AuthProvider.providers[:spotify], uid: oauth_response.uid)
      #then we have no account at all; create auth and create user; log me in
    end
    render json: user, status: :ok
  end

  def discord
    oauth_response = request.env['omniauth.auth']

    user = User.find_by_id(session[:user_id])
    auth = AuthProvider.find_by(provider: AuthProvider.providers[:spotify], uid: oauth_response.uid)
    if user && auth
      #then we are logged on already and authed; show my credentials maybe
    elsif user && !auth
      auth = AuthProvider.create(auth: oauth_response, user_id: user.id, provider: AuthProvider.providers[:discord], uid: oauth_response.uid)
      #then we are logged on but not authed with this provider/account; create new auth provider, add/override onto user
    elsif !user && auth
      user = User.find_by_id(auth.user_id)
      session[:user_id] = user.id
      #then we are logged out but have an account already associated; log me in and set session
    elsif !user && !auth
      user = User.create(username: oauth_response.username) #using username here cause it ezier
      session[:user_id] = user.id

      auth = AuthProvider.create(auth: oauth_response, user_id: user.id, provider: AuthProvider.providers[:discord], uid: oauth_response.uid)
      #then we have no account at all; create auth and create user; log me in
    end
    render json: user, status: :ok
  end

  def debug
    auths = AuthProvider.all
    users = User.all
    render json: users, status: :ok
  end

  def index
    user = User.includes(:auth_provider).find_by_id(session[:user_id])
    if user
      render json: user.auth_provider, status: :ok
    else
      render json: user, status: :ok
    end
  end

  def logout #or maybe destroy
    session[:user_id] = nil
    render json: nil, status: :ok
  end
end
