class AddColumnsToSale < ActiveRecord::Migration
  def change
    add_column :sales, :computation_breakup_fee_percentage_1, :decimal
    add_column :sales, :computation_breakup_fee_percentage_2, :decimal
    add_column :sales, :computation_required_overbid_percentage_1, :decimal
    add_column :sales, :computation_required_overbid_percentage_2, :decimal
    add_column :sales, :computation_judge_code, :integer
  end
end
