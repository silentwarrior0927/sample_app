require "spec_helper"

describe FreeTrialsController do
  describe "routing" do

    it "routes to #index" do
      get("/free_trials").should route_to("free_trials#index")
    end

    it "routes to #new" do
      get("/free_trials/new").should route_to("free_trials#new")
    end

    it "routes to #show" do
      get("/free_trials/1").should route_to("free_trials#show", :id => "1")
    end

    it "routes to #edit" do
      get("/free_trials/1/edit").should route_to("free_trials#edit", :id => "1")
    end

    it "routes to #create" do
      post("/free_trials").should route_to("free_trials#create")
    end

    it "routes to #update" do
      put("/free_trials/1").should route_to("free_trials#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/free_trials/1").should route_to("free_trials#destroy", :id => "1")
    end

  end
end
