class CreateAskUsers < ActiveRecord::Migration
  def change
    create_table :ask_users do |t|
      t.references :user, index: true, null: false
      t.references :question, index: true, null: false
      t.integer :state
      t.references :comment, index: true

      t.timestamps null: false
    end

    add_index :ask_users, [:user_id, :question_id], unique: true
  end
end
