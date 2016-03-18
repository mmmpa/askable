require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'システムで使う、ひと一文字ログインユーザー' do
    it 'システム' do
      expect(User.system).to be_a(User)
    end

    it 'インフォメーション' do
      expect(User.information).to be_a(User)
    end

    it 'エラー' do
      expect(User.error).to be_a(User)
    end

    it '招待者' do
      expect(User.invitation).to be_a(User)
    end

    it '削除済みユーザー' do
      expect(User.deleted).to be_a(User)
    end
  end

  describe 'テストユーザーか否か' do
    it do
      expect(User.system.system?).to be_truthy
    end

    it do
      expect(User.first.system?).to be_falsey
    end
  end

  describe 'システムユーザー以外を得る' do
    it do
      expect { User.normal.find(User.system.id) }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end
