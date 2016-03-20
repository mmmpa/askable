require 'rails_helper'

RSpec.describe AskUser, type: :model do
  describe 'ステータスリスト' do
    it '反応まち' do
      expect(AskUser.not_yet_states).to match_array([0, 4])
    end

    it '反応済み' do
      expect(AskUser.responded_states).to match_array([1, 2, 3, 5])
    end
  end
end
