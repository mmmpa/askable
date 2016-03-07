require 'rails_helper'

RSpec.describe GroupUser, type: :model do
  it { expect(create(:group_user, :valid)).to be_a(GroupUser) }
end
