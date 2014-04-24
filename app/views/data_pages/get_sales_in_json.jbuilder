json.array!(@sales_in_json) do |sale|
	json.extract! sale, :debtor, :assets, :stalking_horse_bid_1, :winning_bid_1, :debtor_counsel, :computation_breakup_fee_percentage_2, :computation_judge_code
end