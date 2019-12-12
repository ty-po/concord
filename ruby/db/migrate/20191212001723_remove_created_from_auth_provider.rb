class RemoveCreatedFromAuthProvider < ActiveRecord::Migration[5.2]
  def change
    remove_column :auth_providers, :created, :datetime
  end
end
