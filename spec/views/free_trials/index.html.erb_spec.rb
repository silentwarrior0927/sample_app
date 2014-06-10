require 'spec_helper'

describe "free_trials/index" do
  before(:each) do
    assign(:free_trials, [
      stub_model(FreeTrial,
        :email => "Email"
      ),
      stub_model(FreeTrial,
        :email => "Email"
      )
    ])
  end

  it "renders a list of free_trials" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Email".to_s, :count => 2
  end
end
