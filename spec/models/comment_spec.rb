require 'rails_helper'

RSpec.describe Comment, type: :model do
  let(:question) { create(:question, :valid) }
  it { expect(create(:comment, :valid, question: question)).to be_a(Comment) }
  it { expect(create(:valid_reply, :valid, question: question)).to be_a(Comment) }
end
