class Post < ApplicationRecord
  validates :content, presence: true
  has_many :post_images, dependent: :destroy

  accepts_nested_attributes_for :post_images, update_only: true, allow_destroy: true
end
