require 'csv'    

namespace :db do
	desc "Populate bankruptcy database"
	task populate_bankruptcy_database: :environment do

		CSV.foreach("363Live data v0.csv", :headers => true) do |row|
			row.map do |cell|
				cell[1] = cell[1]
				if cell[1].class == String && !cell[0].starts_with?("comments_on") && !cell[0].starts_with?("computation") && cell[0].casecmp("winning_bid_1") != 0
					cell[1] = cell[1].split('; ')
				end
			end
			row = row.to_hash
			Sale.create!(row.to_hash)
		end

	end
end