require 'rails_helper'

RSpec.describe Comment, type: :model do
  let(:question) { create(:question, :valid) }
  it { expect(create(:comment, :valid, question: question)).to be_a(Comment) }
  it { expect(create(:valid_reply, :valid, question: question)).to be_a(Comment) }

  describe 'sql 節約' do
    context 'ユーザー名の挿入' do
      it do
        create(:comment, :valid, question: question)
        name = Comment.first.author_name
        expect(Comment.with_author.find(Comment.first.id).author_name).to eq(name)
      end
    end
  end

  describe 'behavior' do
    it 'クエスチョン本文は削除できない' do
      expect { question.comments.first.destroy }.to raise_error(Comment::CannotDestroyRootComment)
    end

    context 'ルートコメントであるか' do
      before :each do
        question.add_comment!(create(:comment, :valid))
      end

      it do
        expect(question.comments.first.root?).to be_truthy
      end

      it do
        expect(question.comments.second.root?).to be_falsey
      end
    end

    context 'tableのレンダリング' do
      it do
        comment = create(:comment, :valid, markdown: %q{
|A|B|
|---|---|
|a|b|
        })
        expect(comment.html).to include('</table>')
      end
    end

    context 'コードのレンダリング' do
      it do
        comment = create(:comment, :valid, markdown: %q{
````
|A|B|
|---|---|
|a|b|
````
        })
        expect(comment.html).to include('class="highlight"')
        expect(comment.html).to include('|---|---|')
      end
    end
  end
end
