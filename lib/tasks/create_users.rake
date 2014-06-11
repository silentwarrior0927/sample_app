namespace :db do
  desc "Create sample user"
  task create_sample_user: :environment do
    User.create!(fname: "John",
                 lname: "Hartsfeld",
                 preferred_name: "John",
                 email: "john.hartsfeld@363live.com",
                 password: "foobar",
                 password_confirmation: "foobar",
                 password_changed: false,
                 firm_name: "363Live",
                 short_firm_name: "363Live",
                 office_city: "New York City",
                 email_verified: false)
    User.create!(fname: "Rolando",
                 lname: "Capinpin",
                 preferred_name: "Rolando",
                 email: "rcapinpin@zcap.net",
                 password: "PIA^x^EW",
                 password_confirmation: "PIA^x^EW",
                 password_changed: false,
                 firm_name: "Z Capital Partners",
                 short_firm_name: "Z Capital",
                 office_city: "Lake Forest, Illinois",
                 email_verified: false)
    User.create!(fname: "Sergio",
                 lname: "Zepeda",
                 preferred_name: "Sergio",
                 email: "szepeda@zcap.net",
                 password: "w4?pAFRa",
                 password_confirmation: "w4?pAFRa",
                 password_changed: false,
                 firm_name: "Z Capital Partners",
                 short_firm_name: "Z Capital",
                 office_city: "Lake Forest, Illinois",
                 email_verified: false)
  end
end
