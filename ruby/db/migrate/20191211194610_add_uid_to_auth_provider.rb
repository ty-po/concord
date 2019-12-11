class AddUidToAuthProvider < ActiveRecord::Migration[5.2]
  def change
    add_column :auth_providers, :uid, :string
  end
end
