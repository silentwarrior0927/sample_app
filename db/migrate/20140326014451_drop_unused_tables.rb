class DropUnusedTables < ActiveRecord::Migration
  def change
  	drop_table :bankruptcy_data
  	drop_table :sales
  end
end
