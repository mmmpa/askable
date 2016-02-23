require 'rails_helper'

RSpec.describe Question, type: :model do
  describe 'factory' do
    it { expect(create(:question, :valid)).to be_a(Question) }
  end

  describe 'validation' do
    it '正常なデータ' do
      expect(build(:question, :valid).valid?).to be_truthy
    end

    it 'コメントがひとつ以上必要' do
      expect(build(:question, :valid, comments: []).valid?).to be_falsey
    end

    it 'タイトルが必要' do
      expect(build(:question, :valid, title: '').valid?).to be_falsey
    end

    it 'オーナーが必要' do
      expect(build(:question, :valid, user: nil).valid?).to be_falsey
    end
  end
end
