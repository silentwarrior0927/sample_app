SampleApp::Application.routes.draw do

  # resources :sessions, only: [:new, :create, :destroy]
  
  root 'static_pages#home'
  
  match '/help',  to: 'static_pages#help',  via: 'get'
  match '/about', to: 'static_pages#about', via: 'get'
  
  match '/signin', to: 'sessions#create', via: 'post'
  match '/signout', to: 'sessions#destroy', via: 'get'
  
  match '/search', to: 'data_pages#search', via: 'get'
  match '/display_tables', to: 'data_pages#display_tables', via: 'post'
  match '/display_charts', to: 'data_pages#display_charts', via: 'get'
  match '/data_pages/sales_in_json.json', to: 'data_pages#get_sales_in_json', via: 'get'
  match '/data_pages/data_force_plot.csv', to: 'data_pages#get_data_force_plot', via: 'get'
  match '/data_pages/data_sunburst.json', to: 'data_pages#get_data_sunburst', via: 'get'
  match '/data_pages/data_sunburst_static.json', to: 'data_pages#get_data_sunburst_static', via: 'get'
  
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end