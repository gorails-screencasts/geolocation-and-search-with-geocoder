document.addEventListener("turbolinks:load", function() {
  var map = new GMaps({
    div: '#map',
    lat: 38.5816,
    lng: -121.4944
  });
  window.map = map;

  var transactions = JSON.parse(document.querySelector("#map").dataset.transactions);
  window.transactions = transactions;

  transactions.forEach(function(transaction) {
    if (transaction.latitude && transaction.longitude) {
      var marker = map.addMarker({
        lat: transaction.latitude,
        lng: transaction.longitude,
        title: transaction.address,
        infoWindow: {
          content: `<p><a href='/transactions/${transaction.id}'>${transaction.address}</a></p>`
        }
      });
    }
  });

  var l = document.querySelector("#map").dataset.l;
  if (l) {
    var latlngs   = l.split(',');
    var southWest = new google.maps.LatLng(latlngs[0], latlngs[1]);
    var northEast = new google.maps.LatLng(latlngs[2], latlngs[3]);
    var bounds    = new google.maps.LatLngBounds(southWest, northEast);
    map.fitBounds(bounds, 0);
  } else {
    map.fitZoom();
  }

  document.querySelector("#redo-search").addEventListener("click", function(e) {
    e.preventDefault();

    var bounds = map.getBounds();
    var location = bounds.getSouthWest().toUrlValue() + "," + bounds.getNorthEast().toUrlValue();

    Turbolinks.visit(`/transactions?l=${location}`);
  });
});
