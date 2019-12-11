class AddProviderToAuthProviders < ActiveRecord::Migration[5.2]
  def change
    add_column :auth_providers, :provider, :integer
  end
end
