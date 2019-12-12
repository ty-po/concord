class RemoveCreatedFromUser < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :created, :datetime
  end
end
