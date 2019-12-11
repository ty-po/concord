class RemoveFieldProviderFromAuthProviders < ActiveRecord::Migration[5.2]
  def change
    remove_column :auth_providers, :provider, :string
  end
end
