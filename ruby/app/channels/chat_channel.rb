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
    if current_user
      ActionCable.server.broadcast "public", current_user.auth_provider
    else
      ActionCable.server.broadcast "public", current_user
    end
  end
end
