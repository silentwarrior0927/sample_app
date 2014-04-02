class Sale < ActiveRecord::Base

	include PgSearch
	pg_search_scope :search_by_debtor, against: :debtor, using: { tsearch: { prefix: true } }

end