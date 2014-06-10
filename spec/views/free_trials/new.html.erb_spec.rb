require 'spec_helper'

describe "free_trials/new" do
  before(:each) do
    assign(:free_trial, stub_model(FreeTrial,
      :email => "MyString"
    ).as_new_record)
  end

  it "renders new free_trial form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", free_trials_path, "post" do
      assert_select "input#free_trial_email[name=?]", "free_trial[email]"
    end
  end
end
