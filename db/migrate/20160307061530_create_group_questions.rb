class CreateGroupQuestions < ActiveRecord::Migration
  def change
    create_table :group_questions do |t|
      t.references :group, index: true, nul: false
      t.references :question, index: true, nul: false

      t.timestamps null: false
    end

    add_index :group_questions, [:group_id, :question_id], unique: true
  end
end
