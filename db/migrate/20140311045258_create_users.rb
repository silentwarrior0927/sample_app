class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :fname
      t.string :lname
      t.string :preferred_name
      t.string :email
      t.boolean :password_changed
      t.string :firm_name
      t.string :short_firm_name
      t.string :office_city
      t.boolean :email_verified

      t.timestamps
    end
  end
end
