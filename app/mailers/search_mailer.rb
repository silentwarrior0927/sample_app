class SearchMailer < ActionMailer::Base
  
  default from: "john.hartsfeld@363live.com"

  def search_notification_email(user)
  	@user = user
  	mail(to: 'john.hartsfeld@363live.com', subject: 'User has made a search')
  end

end
