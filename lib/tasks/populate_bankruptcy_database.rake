require 'csv'    

namespace :db do
	desc "Populate bankruptcy database"
	task populate_bankruptcy_database: :environment do

		CSV.foreach("363Live data v0.csv", :headers => true) do |row|
			row.map do |cell|
				if cell[1].class == String
					cell[1] = cell[1].split('; ')
				end
			end
			row = row.to_hash
			Sale.create!(row.to_hash)
		end

	end
end