class AddTokenToAuthProvider < ActiveRecord::Migration[5.2]
  def change
    add_column :auth_providers, :token, :string
  end
end
