require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'factory' do
    it { expect(create(:user, :valid)).to be_a(User) }
  end
end
