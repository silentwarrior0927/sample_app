require 'spec_helper'

describe "free_trials/edit" do
  before(:each) do
    @free_trial = assign(:free_trial, stub_model(FreeTrial,
      :email => "MyString"
    ))
  end

  it "renders the edit free_trial form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", free_trial_path(@free_trial), "post" do
      assert_select "input#free_trial_email[name=?]", "free_trial[email]"
    end
  end
end
