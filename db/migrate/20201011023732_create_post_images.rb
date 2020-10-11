class CreatePostImages < ActiveRecord::Migration[6.0]
  def change
    create_table :post_images do |t|
      t.string :src, null: false
      t.references :post, null: false
      t.timestamps
    end
  end
end
