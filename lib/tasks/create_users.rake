namespace :db do
  desc "Create sample user"
  task create_sample_user: :environment do
    User.create!(fname: "Xiaoyang",
                 lname: "Zhuang",
                 preferred_name: "X",
                 email: "x@363live.com",
                 password: "foobar",
                 password_confirmation: "foobar",
                 password_changed: false,
                 firm_name: "363Live",
                 short_firm_name: "363Live",
                 office_city: "New York City",
                 email_verified: false)
  end
end
