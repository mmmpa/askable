class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :owner_id, null: false, index: true
      t.integer :user_id, null: false, index: true
      t.boolean :owner_own, null: false, default: true
      t.boolean :user_own, null: false, default: true
      t.string :title, null: false
      t.text :markdown, null: false
      t.text :html, null: false

      t.timestamps null: false
    end
  end
end
