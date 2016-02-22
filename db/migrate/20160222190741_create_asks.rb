class CreateAsks < ActiveRecord::Migration
  def change
    create_table :asks do |t|
      t.string :title, null: false

      t.references :user, null: false
      t.references :comment, null: false

      t.timestamps null: false
    end
  end
end
