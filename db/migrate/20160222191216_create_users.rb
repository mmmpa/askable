class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :login, null: false, index: {unique: true}
      t.string :email, null: false, index: {unique: true}

      t.string :new_email, index: {unique: true}
      t.string :new_email_token, index: {unique: true}

      t.string :crypted_password, null: false
      t.string :password_salt, null: false

      t.string :persistence_token
      t.string :single_access_token
      t.string :perishable_token

      t.timestamps null: false
    end
  end
end
