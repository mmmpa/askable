#
# systemユーザーとぶつかるため
#
class User
  class << self
    attr_accessor :test_store

    def init_for_test
      User.test_store = [nil]
      User.test_store.push FactoryGirl.create(:user, :valid, password: 'a' * 8)
      User.test_store.push FactoryGirl.create(:user, :valid, password: 'b' * 8)
      User.test_store.push FactoryGirl.create(:user, :valid, password: 'c' * 8)
      User.test_store.push FactoryGirl.create(:user, :valid, password: 'd' * 8)
      User.test_store.push FactoryGirl.create(:user, :valid, password: 'e' * 8)
      User.test_store.push FactoryGirl.create(:user, :valid, password: 'f' * 8)
      User.test_store.push FactoryGirl.create(:user, :valid, password: 'g' * 8)

      GroupUser.destroy_all
    end

    def first
      find(test_store[1].id)
    end

    def second
      find(test_store[2].id)
    end

    def third
      find(test_store[3].id)
    end

    def fourth
      find(test_store[4].id)
    end

    def fifth
      find(test_store[5].id)
    end

    def sixth
      find(test_store[6].id)
    end

    def seventh
      find(test_store[7].id)
    end
  end
end