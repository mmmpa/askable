class CreateGroupUsers < ActiveRecord::Migration
  def change
    create_table :group_users do |t|
      t.references :group, index: true, null: false
      t.references :user, index: true, null: false

      t.timestamps null: false
    end

    add_index :group_users, [:group_id, :user_id], unique: true
  end
end
