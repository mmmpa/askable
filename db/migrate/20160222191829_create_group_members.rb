class CreateGroupMembers < ActiveRecord::Migration
  def change
    create_table :group_members do |t|
      t.references :group, index: true, null: false
      t.references :user, index: true, null: false

      t.timestamps null: false
    end

    add_index :group_members, [:group_id, :user_id], unique: true
  end
end
