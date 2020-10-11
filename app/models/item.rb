class Item < ApplicationRecord
  has_many :item_images, dependent: :destroy

  accepts_nested_attributes_for :item_images, update_only: true, allow_destroy: true
end
