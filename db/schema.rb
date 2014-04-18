# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140408001820) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "sales", force: true do |t|
    t.date     "bankruptcy_filing_date",                     default: [], array: true
    t.text     "debtor",                                     default: [], array: true
    t.integer  "chapter",                                    default: [], array: true
    t.text     "assets",                                     default: [], array: true
    t.text     "stalking_horse_parent",                      default: [], array: true
    t.text     "stalking_horse",                             default: [], array: true
    t.integer  "stalking_horse_bid_1",                       default: [], array: true
    t.text     "stalking_horse_bid_text",                    default: [], array: true
    t.integer  "breakup_fee_1",                              default: [], array: true
    t.integer  "breakup_fee_2",                              default: [], array: true
    t.text     "breakup_fee_text",                           default: [], array: true
    t.integer  "required_overbid_1",                         default: [], array: true
    t.integer  "required_overbid_2",                         default: [], array: true
    t.text     "required_overbid_text",                      default: [], array: true
    t.text     "bidder_list",                                default: [], array: true
    t.text     "winner_parent",                              default: [], array: true
    t.text     "winner",                                     default: [], array: true
    t.integer  "winning_bid_1",                              default: [], array: true
    t.text     "winning_bid_text",                           default: [], array: true
    t.text     "judge",                                      default: [], array: true
    t.text     "court",                                      default: [], array: true
    t.text     "debtor_counsel",                             default: [], array: true
    t.text     "stalking_horse_counsel",                     default: [], array: true
    t.date     "bidding_procedures_order_filed",             default: [], array: true
    t.date     "sale_order_filed",                           default: [], array: true
    t.date     "bankruptcy_case_closed",                     default: [], array: true
    t.text     "comments_on_bankruptcy_filing_date"
    t.text     "comments_on_debtor"
    t.text     "comments_on_chapter"
    t.text     "comments_on_assets"
    t.text     "comments_on_stalking_horse_parent"
    t.text     "comments_on_stalking_horse"
    t.text     "comments_on_stalking_horse_bid_1"
    t.text     "comments_on_stalking_horse_bid_text"
    t.text     "comments_on_breakup_fee_1"
    t.text     "comments_on_breakup_fee_text"
    t.text     "comments_on_required_overbid_1"
    t.text     "comments_on_required_overbid_text"
    t.text     "comments_on_bidder_list"
    t.text     "comments_on_winner_parent"
    t.text     "comments_on_winner"
    t.text     "comments_on_winning_bid_1"
    t.text     "comments_on_winning_bid_text"
    t.text     "comments_on_judge"
    t.text     "comments_on_court"
    t.text     "comments_on_debtor_counsel"
    t.text     "comments_on_stalking_horse_counsel"
    t.text     "comments_on_bidding_procedures_order_filed"
    t.text     "comments_on_sale_order_filed"
    t.text     "comments_on_bankruptcy_case_closed"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.decimal  "computation_breakup_fee_percentage_1"
    t.decimal  "computation_breakup_fee_percentage_2"
    t.decimal  "computation_required_overbid_percentage_1"
    t.decimal  "computation_required_overbid_percentage_2"
    t.integer  "computation_judge_code"
  end

  create_table "users", force: true do |t|
    t.string   "fname"
    t.string   "lname"
    t.string   "preferred_name"
    t.string   "email"
    t.boolean  "password_changed"
    t.string   "firm_name"
    t.string   "short_firm_name"
    t.string   "office_city"
    t.boolean  "email_verified"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "password_digest"
    t.string   "remember_token"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["remember_token"], name: "index_users_on_remember_token", using: :btree

end
