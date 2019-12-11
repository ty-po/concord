class CreateAuthProviders < ActiveRecord::Migration[5.2]
  def change
    create_table :auth_providers do |t|
      t.string :provider
      t.text :auth
      t.timestamp :created
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
