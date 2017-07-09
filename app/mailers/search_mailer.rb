class SearchMailer < ActionMailer::Base
  
  default from: 'xiaoyang.zhuang1@gmail.com'

  def search_notification_email(user, query)
  	@user = user
  	@query = query
  	mail(to: 'xiaoyang.zhuang1@gmail.com', subject: 'User has made a search')
  end

end
