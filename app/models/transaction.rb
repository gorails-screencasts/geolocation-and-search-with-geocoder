class Transaction < ApplicationRecord
  geocoded_by :address
  after_validation :geocode, if: :address_changed?

  searchkick locations: [:location]

  def address
    [street, city, zip, state].compact.join(", ")
  end

  def address_changed?
    street_changed? || city_changed? || zip_changed? || state_changed?
  end

  def search_data
    attributes.merge location: { lat: latitude, lon: longitude }
  end
end
