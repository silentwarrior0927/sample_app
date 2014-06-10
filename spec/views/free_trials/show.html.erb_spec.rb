require 'spec_helper'

describe "free_trials/show" do
  before(:each) do
    @free_trial = assign(:free_trial, stub_model(FreeTrial,
      :email => "Email"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Email/)
  end
end
