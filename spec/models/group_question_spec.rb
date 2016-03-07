require 'rails_helper'

RSpec.describe GroupQuestion, type: :model do
  describe 'factory' do
    it { expect(create(:group_question, :valid)).to be_a(GroupQuestion) }
  end
end
