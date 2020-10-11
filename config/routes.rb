Rails.application.routes.draw do
  resources :items
  root "posts#index"

  resources :posts
end
