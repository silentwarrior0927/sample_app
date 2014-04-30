json.array!(@sales_in_json) do |sale|
	json.extract! sale, :debtor, :assets, :stalking_horse_bid_1, :judge, :court, :computation_breakup_fee_percentage_2
end