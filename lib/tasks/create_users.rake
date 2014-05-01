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
    User.create!(fname: "Karn",
                 lname: "Chopra",
                 preferred_name: "Karn",
                 email: "kchopra@centerviewpartners.com",
                 password: "PIA^x^EW",
                 password_confirmation: "PIA^x^EW",
                 password_changed: false,
                 firm_name: "Centerview Partners",
                 short_firm_name: "Centerview",
                 office_city: "New York City",
                 email_verified: false)
    User.create!(fname: "Ryan",
                 lname: "Kielty",
                 preferred_name: "Ryan",
                 email: "rkielty@centerviewpartners.com",
                 password: "w4?pAFRa",
                 password_confirmation: "w4?pAFRa",
                 password_changed: false,
                 firm_name: "Centerview Partners",
                 short_firm_name: "Centerview",
                 office_city: "New York City",
                 email_verified: false)
    User.create!(fname: "Ian",
                 lname: "Holmes",
                 preferred_name: "Ian",
                 email: "iholmes@centerviewpartners.com",
                 password: "yacRe2Ha",
                 password_confirmation: "yacRe2Ha",
                 password_changed: false,
                 firm_name: "Centerview Partners",
                 short_firm_name: "Centerview",
                 office_city: "New York City",
                 email_verified: false)
  end
end
