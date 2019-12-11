class AuthProvider < ApplicationRecord
  belongs_to :user
  enum provider: [:spotify, :discord]
end
