class StaticBus
  include MessBus::Subscriber

  listen :on_user_created

  def on_user_created
    pp [:created]
  end
end
