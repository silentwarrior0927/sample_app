class DataPagesController < ApplicationController
	
	def search
	end

	def get_sales_in_json
		# @suggestions = Sale.search_by_debtor(params[:q])
		@sales_in_json = Sale.order(stalking_horse_bid_1: :desc).where.not(stalking_horse_bid_1: nil)
	end

	def display_tables
		@query = params[:sale][:debtor_searchfield]
		@results = Sale.search_by_debtor(params[:sale][:debtor_searchfield])
	end

	def display_charts
	end

end
