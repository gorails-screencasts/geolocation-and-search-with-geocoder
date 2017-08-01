json.extract! transaction, :id, :street, :city, :zip, :state, :beds, :baths, :sq__ft, :sale_date, :price, :latitude, :longitude, :created_at, :updated_at
json.url transaction_url(transaction, format: :json)
