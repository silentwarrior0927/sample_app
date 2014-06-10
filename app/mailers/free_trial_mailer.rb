class FreeTrialMailer < ActionMailer::Base
  
  default from: 'john.hartsfeld@363live.com'

  def free_trial_email(email)
  	@email = email
  	mail(to: 'john.hartsfeld@363live.com', subject: 'Free trial requested')
  end

end
