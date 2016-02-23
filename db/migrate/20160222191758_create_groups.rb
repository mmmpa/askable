class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.string :name, null: false
      t.references :user, index: true, null: false

      t.timestamps null: false
    end
  end
end
