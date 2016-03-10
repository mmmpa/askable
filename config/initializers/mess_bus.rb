module MessBus

  #
  # ActionControllerを拡張する
  #
  module Controller
    extend ActiveSupport::Concern

    included do
      before_action :start_mess_bus
      after_action :finish_mess_bus

      def start_mess_bus
        MessBus::StaticHub.init
        RequestStore.store[:current_mess_bus] = MessBus::RequestSubscriber.new
      end

      def finish_mess_bus
        RequestStore.store[:current_mess_bus].finish
        MessBus::StaticHub.finish
      end
    end
  end

  #
  # オブジェクトにmess_busへの経路を与える
  #
  module Hub
    extend ActiveSupport::Concern
    included do |klass|
      class << klass
        def mess_bus
          RequestStore.store[:current_mess_bus]
        end

        def static_mess_bus
          MessBus::StaticHub
        end
      end

      def mess_bus
        self.class.mess_bus
      end

      def static_mess_bus
        self.class.static_mess_bus
      end
    end
  end

  #
  # Staticなバスを管理する
  # addでMessBus::Subscriberを得る
  #
  class StaticHub
    class << self
      attr_accessor :statics

      def init
        RequestStore.store[:current_static_mess_bus] = []
      end

      def told_in_this_request
        RequestStore.store[:current_static_mess_bus]
      end

      def tell(name, *params)
        statics.each do |static_hub|
          static_hub.tell(name, *params)
        end
      end

      def tell_after_all(name, *params)
        told_in_this_request.push({name: name, params: params})
      rescue => e
        Rails.logger.error e
      end

      def finish
        told_in_this_request.each do |told|
          tell(told[:name], *told[:params])
        end
      rescue => e
        Rails.logger.error e
      end

      def listen(*)
        raise MessBus::CannotDynamicListen
      end

      def add(*static_buses)
        static_buses.each do |bus|
          statics << bus
        end
      end

      private

      def tell_support(name, *params)
        callbacks[name.to_sym][:callback].(*params)
      rescue
        begin
          callbacks[name.to_sym][:on_error].(name, *params)
        rescue => e
          Rails.logger.error e
        end
      end
    end

    self.statics = Set.new
  end

  class CannotDynamicListen < StandardError

  end

  class RequestSubscriber
    attr_accessor :callbacks, :after_all

    def initialize
      self.callbacks = {}
      self.after_all = []
    end

    def listen(name, callback, on_error = nil)
      callbacks[name.to_sym] = {callback: callback, on_error: on_error}
    end

    def tell(name, *params)
      return unless callbacks[name.to_sym]
      callbacks[name.to_sym][:callback].(*params)
    rescue
      begin
        callbacks[name.to_sym][:on_error].(name, *params)
      rescue => e
        Rails.logger.error e
      end
    end

    def tell_after_all(name, *params)
      after_all.push({name: name, params: params})
    end

    def finish
      after_all.each do |told|
        tell(told[:name], told[:params])
      end
    end
  end

  #
  # 継承したクラスからactivate!で有効
  #
  module Subscriber
    extend ActiveSupport::Concern

    included do |klass|
      class << klass
        attr_accessor :callbacks, :after_all

        def listen(name, on_error_name = nil)
          callbacks[name.to_sym] = on_error_name
        end

        def tell(name, *params)
          target = new
          return unless target.respond_to?(name)
          target.send(name, *params)
        rescue => e
          begin
            target.send(callbacks[name.to_sym] || :on_any_error, e, name, *params)
          rescue
            Rails.logger.error e
          end
        end
      end

      klass.callbacks = {}
      MessBus::StaticHub.add(klass)
    end
  end

  class Statics
    def self.add(*statics)
      Rails.application.config.after_initialize do
        MessBus::StaticHub.add(*statics)
      end
    end
  end
end

ActionController::Base.send(:include, MessBus::Controller)
ActionController::Base.send(:include, MessBus::Hub)
ActiveRecord::Base.send(:include, MessBus::Hub)

MessBus::Statics.add(StaticBus)