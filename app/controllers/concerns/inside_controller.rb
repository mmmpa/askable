module InsideController
  extend ActiveSupport::Concern

  included do
    before_action -> {
      @group = group
      @user = user
    }

    def question
      return nil unless params[:question_id]
      Question.find(params[:question_id])
    end

    def comment
      Comment.find(params[:comment_id])
    end

    def user
      RequestStore.store[:current_user] || UserSession.find.try(:user)
    end

    def group
      return nil unless params[:group_id]
      RequestStore.store[:current_group] || Group.find(params[:group_id])
    end

    def keeper
      GroupKeeper.(user: user, group: group, question: question)
    end
  end
end
