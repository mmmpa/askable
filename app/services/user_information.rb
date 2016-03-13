class UserInformation
  attr_accessor :user

  class << self
    def call(*args)
      new(*args)
    end
  end

  def initialize(user)
    self.user = user
  end

  def information
    converted.sort_by(&:created_at).reverse
  end

  def converted
    all.map(&method(:convert)).compact
  end

  def convert(model)
    case model
      when GroupUser
        Item.new(
          id: model.id,
          type: :invitation,
          message: "「#{model.group.name}」に招待されています",
          created_at: model.created_at
        )
      when Message
        Item.new(
          id: model.id,
          type: :message,
          message: model.title,
          created_at: model.created_at
        )
      else
        nil
    end
  end

  def all
    invitations + messages
  end

  def invitations
    user.invitations
  end

  def messages
    user.messages
  end

  class Item
    include PrettyDate

    attr_accessor :id, :type, :message, :created_at, :src

    def initialize(**options)
      options.each_pair do |k, v|
        self.send("#{k}=", v)
      end
    end
  end
end

