class AuthProvider < ApplicationRecord
  belongs_to :user
  enum provider: [:spotify, :discord]

  def as_json(options)
    super(:except => [:auth])
  end
end
