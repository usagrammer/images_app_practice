class PostImage < ApplicationRecord
  mount_uploader :src, ImageUploader
  
  belongs_to :post
end
