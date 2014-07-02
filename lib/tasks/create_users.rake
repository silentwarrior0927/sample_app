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
    User.create!(fname: "Bhoomica",
                 lname: "Reddy",
                 preferred_name: "Bhoomica",
                 email: "breddy@jefferies.com",
                 password: "PIA^x^EW",
                 password_confirmation: "PIA^x^EW",
                 password_changed: false,
                 firm_name: "Jefferies",
                 short_firm_name: "Jefferies",
                 office_city: "New York City",
                 email_verified: false)
    User.create!(fname: "Sid",
                 lname: "Li",
                 preferred_name: "Sid",
                 email: "sidli@jefferies.com",
                 password: "w4?pAFRa",
                 password_confirmation: "w4?pAFRa",
                 password_changed: false,
                 firm_name: "Jefferies",
                 short_firm_name: "Jefferies",
                 office_city: "New York City",
                 email_verified: false)
    User.create!(fname: "William",
                 lname: "Derrough",
                 preferred_name: "Bill",
                 email: "william.derrough@moelis.com",
                 password: "PIA^x^EW",
                 password_confirmation: "PIA^x^EW",
                 password_changed: false,
                 firm_name: "Moelis & Company",
                 short_firm_name: "Moelis",
                 office_city: "New York City",
                 email_verified: false)
    User.create!(fname: "Colin",
                 lname: "Lee",
                 preferred_name: "Colin",
                 email: "clee@luzichpartners.com",
                 password: "DFP4a}T/",
                 password_confirmation: "DFP4a}T/",
                 password_changed: false,
                 firm_name: "Luzich Partners",
                 short_firm_name: "Luzich Partners",
                 office_city: "Las Vegas",
                 email_verified: false)
    User.create!(fname: "Sally",
                 lname: "Henry",
                 preferred_name: "Sally",
                 email: "sally.henry@ttu.edu",
                 password: "Fen^6^jQ",
                 password_confirmation: "Fen^6^jQ",
                 password_changed: false,
                 firm_name: "Texas Tech University",
                 short_firm_name: "Texas Tech",
                 office_city: "Lubbock, Texas",
                 email_verified: false)
    User.create!(fname: "Justin",
                 lname: "Byrne",
                 preferred_name: "Justin",
                 email: "jbyrne@imperialcapital.com",
                 password: "Fen^6^jQ",
                 password_confirmation: "Fen^6^jQ",
                 password_changed: false,
                 firm_name: "Texas Tech University",
                 short_firm_name: "Texas Tech",
                 office_city: "Lubbock, Texas",
                 email_verified: false)
    User.create!(fname: "Lynsey",
                 lname: "McClorey",
                 preferred_name: "Lynsey",
                 email: "lmcclorey@zolfocooper.com",
                 password: "Fen^6^jQ",
                 password_confirmation: "Fen^6^jQ",
                 password_changed: false,
                 firm_name: "Zolfo Cooper",
                 short_firm_name: "Zolfo Cooper",
                 office_city: "New York City",
                 email_verified: false)
    User.create!(fname: "Ira",
                 lname: "Herman",
                 preferred_name: "Ira",
                 email: "ira.herman@tklaw.com",
                 password: "Fen^6^jQ",
                 password_confirmation: "Fen^6^jQ",
                 password_changed: false,
                 firm_name: "Thompson & Knight",
                 short_firm_name: "Thompson & Knight",
                 office_city: "New York City",
                 email_verified: false)
    User.create!(fname: "Brian",
                 lname: "Bacal",
                 preferred_name: "Brian",
                 email: "brian.bacal@moelis.com",
                 password: "Fen^6^jQ",
                 password_confirmation: "Fen^6^jQ",
                 password_changed: false,
                 firm_name: "Moelis & Company",
                 short_firm_name: "Moelis",
                 office_city: "New York City",
                 email_verified: false)
    User.create!(fname: "Patrick",
                 lname: "McGrath",
                 preferred_name: "Patrick",
                 email: "patrick.mcgrath@moelis.com",
                 password: "YHMkS7jY",
                 password_confirmation: "YHMkS7jY",
                 password_changed: false,
                 firm_name: "Moelis & Company",
                 short_firm_name: "Moelis",
                 office_city: "New York City",
                 email_verified: false)
    User.create!(fname: "Adam",
                 lname: "Waldman",
                 preferred_name: "Adam",
                 email: "adam.waldman@moelis.com",
                 password: "NHtPrfaK",
                 password_confirmation: "NHtPrfaK",
                 password_changed: false,
                 firm_name: "Moelis & Company",
                 short_firm_name: "Moelis",
                 office_city: "New York City",
                 email_verified: false)
    User.create!(fname: "Bilal",
                 lname: "Bazzy",
                 preferred_name: "Bilal",
                 email: "bilal.bazzy@rothschild.com",
                 password: "PIA^x^EW",
                 password_confirmation: "PIA^x^EW",
                 password_changed: false,
                 firm_name: "Rothschild",
                 short_firm_name: "Rothschild",
                 office_city: "New York City",
                 email_verified: false)
    User.create!(fname: "Jay",
                 lname: "Goffman",
                 preferred_name: "Jay",
                 email: "jay.goffman@skadden.com",
                 password: "Fen^6^jQ",
                 password_confirmation: "Fen^6^jQ",
                 password_changed: false,
                 firm_name: "Skadden Arps Slate Meagher & Flom",
                 short_firm_name: "Skadden",
                 office_city: "New York City",
                 email_verified: false)

  end
end