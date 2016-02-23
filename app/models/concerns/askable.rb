module Askable
  extend ActiveSupport::Concern
  included do |klass|
    class << klass
      # クラスメソッドなど
    end

    # 自分がした質問
    has_many :questions

    # 回答を要求されている質問
    has_many :ask_users
    has_many :asks, through: :ask_users

    # 自分がした回答やコメント
    has_many :comments
  end
end