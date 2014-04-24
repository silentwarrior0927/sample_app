json.array!(@sales_in_json) do |sale|
	json.extract! sale, :debtor, :assets, :winning_bid_1, :debtor_counsel
end