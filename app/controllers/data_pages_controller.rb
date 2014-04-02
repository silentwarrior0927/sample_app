class DataPagesController < ApplicationController
	
	def search
	end

	def debtor_suggestions
		@suggestions = Sale.search_by_debtor(params[:q])
	end

	def display_tables
		@results = Sale.search_by_debtor(params[:sale][:debtor_searchfield])
	end

end
