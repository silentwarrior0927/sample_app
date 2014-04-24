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

		# Tell the UserMailer to send a welcome email after save
		SearchMailer.search_notification_email(current_user, @query).deliver

	end

	def display_charts
		@total_value_of_sales = Sale.where.not(winning_bid_1: nil).sum(:winning_bid_1)

	end

	def get_data_force_plot
		render layout: false
	end

	def get_data_sunburst
		@sales_in_json = Sale.order(winning_bid_1: :desc).where.not(winning_bid_1: nil)
	end

	def get_data_sunburst_static
		render layout: false
	end

end