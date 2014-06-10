class FreeTrialsController < ApplicationController
  
  def request_free_trial
    
    @email = params[:free_trial][:free_trial_field]

    FreeTrialMailer.free_trial_email(@email).deliver

    redirect_to :root
  
  end

end