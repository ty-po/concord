class User < ApplicationRecord
  has_many :auth_provider
end
