# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

post1 = Post.new(content: 'うさぎ')

post1.post_images.new(src: File.open("./public/seed_images/goron.jpg"))
post1.post_images.new(src: File.open("./public/seed_images/goron2.jpg"))
post1.post_images.new(src: File.open("./public/seed_images/hip.jpg"))
post1.save

item1 = Item.new(
  name: 'rabbit',
  description: '2歳',
  price: 1000
)

item1.item_images.new(src: File.open("./public/seed_images/leg.jpg"))
item1.item_images.new(src: File.open("./public/seed_images/reiwa.jpg"))

item1.save