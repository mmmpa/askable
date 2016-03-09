class CreateMessageUsers < ActiveRecord::Migration
  def change
    create_table :message_users do |t|
      t.references :user, index: true, foreign_key: true
      t.references :message, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
