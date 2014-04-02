json.array!(@suggestions) do |sale|
	json.extract! sale, :debtor
end