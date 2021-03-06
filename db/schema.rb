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

ActiveRecord::Schema.define(version: 20160320041851) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ask_users", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.integer  "question_id", null: false
    t.integer  "state",       null: false
    t.integer  "comment_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "ask_users", ["comment_id"], name: "index_ask_users_on_comment_id", using: :btree
  add_index "ask_users", ["question_id"], name: "index_ask_users_on_question_id", using: :btree
  add_index "ask_users", ["user_id", "question_id"], name: "index_ask_users_on_user_id_and_question_id", unique: true, using: :btree
  add_index "ask_users", ["user_id"], name: "index_ask_users_on_user_id", using: :btree

  create_table "comments", force: :cascade do |t|
    t.text     "html",        null: false
    t.text     "markdown",    null: false
    t.integer  "user_id",     null: false
    t.integer  "comment_id"
    t.integer  "question_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "comments", ["comment_id"], name: "index_comments_on_comment_id", using: :btree
  add_index "comments", ["question_id"], name: "index_comments_on_question_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "group_questions", force: :cascade do |t|
    t.integer  "group_id"
    t.integer  "question_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "group_questions", ["group_id", "question_id"], name: "index_group_questions_on_group_id_and_question_id", unique: true, using: :btree
  add_index "group_questions", ["group_id"], name: "index_group_questions_on_group_id", using: :btree
  add_index "group_questions", ["question_id"], name: "index_group_questions_on_question_id", using: :btree

  create_table "group_users", force: :cascade do |t|
    t.integer  "group_id",   null: false
    t.integer  "user_id",    null: false
    t.integer  "state",      null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "group_users", ["group_id", "user_id"], name: "index_group_users_on_group_id_and_user_id", unique: true, using: :btree
  add_index "group_users", ["group_id"], name: "index_group_users_on_group_id", using: :btree
  add_index "group_users", ["user_id"], name: "index_group_users_on_user_id", using: :btree

  create_table "groups", force: :cascade do |t|
    t.string   "name",        null: false
    t.string   "description", null: false
    t.integer  "user_id",     null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "groups", ["user_id"], name: "index_groups_on_user_id", using: :btree

  create_table "messages", force: :cascade do |t|
    t.integer  "owner_id",                  null: false
    t.integer  "user_id",                   null: false
    t.boolean  "owner_own",  default: true, null: false
    t.boolean  "user_own",   default: true, null: false
    t.string   "title",                     null: false
    t.text     "markdown",                  null: false
    t.text     "html",                      null: false
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  add_index "messages", ["owner_id"], name: "index_messages_on_owner_id", using: :btree
  add_index "messages", ["user_id"], name: "index_messages_on_user_id", using: :btree

  create_table "questions", force: :cascade do |t|
    t.string   "title",      null: false
    t.integer  "state",      null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "questions", ["user_id"], name: "index_questions_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name",                            null: false
    t.string   "login",                           null: false
    t.string   "email",                           null: false
    t.string   "new_email"
    t.string   "new_email_token"
    t.string   "crypted_password",                null: false
    t.string   "password_salt",                   null: false
    t.string   "persistence_token"
    t.string   "single_access_token"
    t.string   "perishable_token"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.integer  "state",               default: 0, null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["login"], name: "index_users_on_login", unique: true, using: :btree
  add_index "users", ["new_email"], name: "index_users_on_new_email", unique: true, using: :btree
  add_index "users", ["new_email_token"], name: "index_users_on_new_email_token", unique: true, using: :btree

end
