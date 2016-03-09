class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.text :markdown
      t.text :html

      t.timestamps null: false
    end
  end
end
