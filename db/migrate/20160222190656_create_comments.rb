class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :html, null: false
      t.text :markdown, null: false

      t.references :user, index: true, null: false
      t.references :comment, index: true
      t.references :question, index: true, null: false

      t.timestamps null: false
    end
  end
end
