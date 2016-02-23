require 'rails_helper'

RSpec.describe Question, type: :model do
  describe 'factory' do
    it { expect(create(:question, :valid)).to be_a(Question) }
  end
end
