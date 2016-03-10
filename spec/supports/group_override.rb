#
# systemグループ保持とぶつかるため
#
class Group
  class << self
    def destroy_all
      Group.all.each do |g|
        g.destroy! unless g.user.system?
      end
    end
  end
end