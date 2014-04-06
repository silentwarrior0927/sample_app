class DataPagesController < ApplicationController
	
	def search
	end

	def debtor_suggestions
		@suggestions = Sale.search_by_debtor(params[:q])
	end

	def display_tables
		@query = params[:sale][:debtor_searchfield]
		@results = Sale.search_by_debtor(params[:sale][:debtor_searchfield])
	end

end
