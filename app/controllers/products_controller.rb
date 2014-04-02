class ProductsController < ApplicationController
	autocomplete :brand, :name
	def show
		@product = Brand.find(all)
	end
end
