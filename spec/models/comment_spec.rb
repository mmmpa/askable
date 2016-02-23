require 'rails_helper'

RSpec.describe Comment, type: :model do
  it { expect(create(:comment, :valid)).to be_a(Comment) }
  it { expect(create(:valid_reply, :valid)).to be_a(Comment) }
end
