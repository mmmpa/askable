class AskUser < ActiveRecord::Base
  #
  # requested: 回答を要求されている状態、未回答
  # answered: 回答した状態。コメントがある。
  # respond: 反応済み状態。コメントはない。
  # assigned: 他のメンバーを紹介。respondと同意。
  # timeout: 回答せずに質問が終了した場合。
  #
  enum state: {requested: 0, answered: 1, responded: 2, assigned: 3, wait: 4, timeout: 5}


  belongs_to :user
  belongs_to :question
  belongs_to :comment

  scope :not_yet, -> { where { state.in(AskUser.not_yet_status) } }
  scope :responded, -> { where { state.in(AskUser.responded_status) } }

  before_validation :initialize_value

  class << self
    alias_method :status, :states

    def not_yet_status
      [status[:requested], status[:wait]]
    end

    def responded_status
      cloned = status.clone
      cloned.delete(:requested)
      cloned.delete(:wait)
      cloned.each_value.inject([]) { |a, value| a << value }
    end
  end

  def initialize_value
    self.state ||= self.class.status[:requested]
  end
end
