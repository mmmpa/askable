class AskUser < ActiveRecord::Base
  #
  # requested: 回答を要求されている状態、未回答
  # answered: 回答した状態。コメントがある。
  # respond: 反応済み状態。コメントはない。
  # assigned: 他のメンバーを紹介。respondと同意。
  #
  enum state: {requested: 0, answered: 1, responded: 2, assigned: 3}


  belongs_to :user
  belongs_to :question
  belongs_to :comment

  before_validation :initialize_value

  class << self
    alias_method :status, :states

    def not_yet_status
      [status[:requested]]
    end

    def responded_status
      cloned = status.clone
      cloned.delete(:requested)
      cloned.each_value.inject([]) { |a, value| a << value }
    end
  end

  def initialize_value
    self.state ||= self.class.status[:requested]
  end

end
