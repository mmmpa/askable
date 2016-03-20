class AddColumnUser < ActiveRecord::Migration
  add_column :users, :state, :integer, null: false, default: 0
end
