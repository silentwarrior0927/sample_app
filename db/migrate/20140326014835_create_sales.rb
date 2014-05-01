class CreateSales < ActiveRecord::Migration
  def change
    create_table :sales do |t|
      t.date :bankruptcy_filing_date, array: true, default: []
      t.text :debtor, array: true, default: []
      t.integer :chapter, array: true, default: [], limit: 2
      t.text :assets, array: true, default: []
      t.text :stalking_horse_parent, array: true, default: []
      t.text :stalking_horse, array: true, default: []
      t.integer :stalking_horse_bid_1, array: true, default: [], limit: 8
      t.text :stalking_horse_bid_text, array: true, default: []
      t.integer :breakup_fee_1, array: true, default: []
      t.integer :breakup_fee_2, array: true, default: []
      t.text :breakup_fee_text, array: true, default: []
      t.integer :required_overbid_1, array: true, default: []
      t.integer :required_overbid_2, array: true, default: []
      t.text :required_overbid_text, array: true, default: []
      t.text :bidder_list, array: true, default: []
      t.text :winner_parent, array: true, default: []
      t.text :winner, array: true, default: []
      t.integer :winning_bid_1, limit: 8
      t.text :winning_bid_text, array: true, default: []
      t.text :judge, array: true, default: []
      t.text :court, array: true, default: []
      t.text :debtor_counsel, array: true, default: []
      t.text :stalking_horse_counsel, array: true, default: []
      t.date :bidding_procedures_order_filed, array: true, default: []
      t.date :sale_order_filed, array: true, default: []
      t.date :bankruptcy_case_closed, array: true, default: []
      t.text :comments_on_bankruptcy_filing_date
      t.text :comments_on_debtor
      t.text :comments_on_chapter
      t.text :comments_on_assets
      t.text :comments_on_stalking_horse_parent
      t.text :comments_on_stalking_horse
      t.text :comments_on_stalking_horse_bid_1
      t.text :comments_on_stalking_horse_bid_text
      t.text :comments_on_breakup_fee_1
      t.text :comments_on_breakup_fee_text
      t.text :comments_on_required_overbid_1
      t.text :comments_on_required_overbid_text
      t.text :comments_on_bidder_list
      t.text :comments_on_winner_parent
      t.text :comments_on_winner
      t.text :comments_on_winning_bid_1
      t.text :comments_on_winning_bid_text
      t.text :comments_on_judge
      t.text :comments_on_court
      t.text :comments_on_debtor_counsel
      t.text :comments_on_stalking_horse_counsel
      t.text :comments_on_bidding_procedures_order_filed
      t.text :comments_on_sale_order_filed
      t.text :comments_on_bankruptcy_case_closed
      t.decimal :computation_breakup_fee_percentage_1
      t.decimal :computation_breakup_fee_percentage_2
      t.decimal :computation_required_overbid_percentage_1
      t.decimal :computation_required_overbid_percentage_2

      t.timestamps
    end
  end
end