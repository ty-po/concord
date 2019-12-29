class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "public"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_message(data)

    #ChatChannel.broadcast_to(
    #  "public",
    #  data
    #)

    ActionCable.server.broadcast "public", data

  end

  def get_user()
    user = User.includes(:auth_provider).find_by_id(session[:user_id])
    if user
      ActionCable.server.broadcast "public", user.auth_provider
    else
      ActionCable.server.broadcast "public", user
    end
  end
end
