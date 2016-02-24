require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'factory' do
    it { expect(create(:user, :valid)).to be_a(User) }
  end

  describe 'validation' do
    let(:other) { User.first }

    it 'メールアドレスが必要' do
      expect(build(:user, :valid, email: '').valid?).to be_falsey
    end

    it 'メールアドレスはユニーク' do
      expect(build(:user, :valid, email: other.email).valid?).to be_falsey
    end

    it 'login名が必要' do
      expect(build(:user, :valid, login: '').valid?).to be_falsey
    end

    it 'login名はユニーク' do
      expect(build(:user, :valid, login: other.login).valid?).to be_falsey
    end

    it '表示名が必要' do
      expect(build(:user, :valid, name: '').valid?).to be_falsey
    end
  end
end
