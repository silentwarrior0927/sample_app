class FreeTrialMailer < ActionMailer::Base
  
  default from: 'xiaoyang.zhuang1@gmail.com'

  def free_trial_email(email)
  	@email = email
  	#mail(to: 'xiaoyang.zhuang1@gmail.com', subject: 'Free trial requested')
  end

end
