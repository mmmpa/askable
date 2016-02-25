module RSpec
  module Core
    class ExampleGroup
      def ready_ss(ex, strict_height = nil)
        @ss_man = ScreenShotMan.new(ex.full_description.split(' '))
        @ss_man.clean!
        @strict_height = strict_height
      end

      def take_ss(name, sleeping = 0)
        sleep sleeping

        page.driver.resize(1240, @strict_height) if @strict_height
        page.save_screenshot(@ss_man.filename!(name), full: !@strict_height)
      end
    end
  end
end
