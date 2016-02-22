class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :html, null: false
      t.text :markdown, null: false

      t.references :user, null: false
      t.references :comment
      t.references :ask, null: false

      t.timestamps null: false
    end
  end
end
