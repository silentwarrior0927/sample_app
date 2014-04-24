class SessionsController < ApplicationController

	def create
		user = User.find_by(email: params[:session][:email].downcase)
		
		if user && user.authenticate(params[:session][:password])
		# Sign the user in and redirect to the user's show page.
			# render text: "OK"
			sign_in user
			redirect_to '/home'
		else
		# Create an error message and re-render the signin form.
			flash.now[:error] = 'Invalid email <br> and/or password'.html_safe
			render 'static_pages/home'
		end
	end

end
