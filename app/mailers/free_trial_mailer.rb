class FreeTrialMailer < ActionMailer::Base
  
  default from: 'xiaoyang.zhuang@alumni.duke.edu'

  def free_trial_email(email)
  	@email = email
  	mail(to: 'xiaoyang.zhuang@alumni.duke.edu', subject: 'Free trial requested')
  end

end
