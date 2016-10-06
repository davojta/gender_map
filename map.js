"use strict";

L.NumberedDivIcon = L.Icon.extend({
      options: {
      // EDIT THIS TO POINT TO THE FILE AT http://www.charliecroom.com/marker_hole.png (or your own marker)
      iconUrl: './images/marker_hole.png',
      number: '',
      shadowUrl: null,
      iconSize: new L.Point(25, 41),
      iconAnchor: new L.Point(13, 41),
      popupAnchor: new L.Point(0, -33),
      /*
       iconAnchor: (Point)
       popupAnchor: (Point)
       */
      className: 'leaflet-div-icon'
  },

  createIcon: function() {
      var div = document.createElement('div');
      var img = this._createImg(this.options['iconUrl']);
      var numdiv = document.createElement('div');
      numdiv.setAttribute("class", "number");
      numdiv.innerHTML = this.options['number'] || '';
      div.appendChild(img);
      div.appendChild(numdiv);
      this._setIconStyles(div, 'icon');
      return div;
  },

  //you could change this to add a shadow like in the normal marker if you really wanted
  createShadow: function() {
      return null;
  }
});

artists = artists.reduce((hash, artist) => {
    if (artist.text.length === 0) artist.text = 'Нету информации о художнице'
    hash[artist.id] = artist
    return hash
}, {})



function showArtist(artistId) {
    var artist = artists[artistId]
    console.log('artist', artist.text)
    $('#artistModal').modal('show')

    $('#artistModalLabel').text(artist.name)
    $('#artistText').text(artist.text)
    $('#artistModalPhoto').attr('src', `data/${artist.photo}`)


}
function getPlacePopup(place) {
    var artistsHtml = place.artists
        .map((artistId) => artists[artistId])
        .map((artist) => {
            return `<li class="artist"><img src="data/${artist.photo}" class="img-responsive img-circle artist-photo" alt="${artist.name}'s photo"/><a href="#${artist.id}" data-id="${artist.id}"  class="artist-name js-artist-link">${artist.name} </a></li>`
        })
    return `
<p>Художницы:</p>
<ul class="list-unstyled">
${artistsHtml.join('')}
</ul>            
`
}






$(function() {
    var mymap = L.map('map').setView([53.8998, 27.5511], 12);
    const accessToken = 'pk.eyJ1IjoiZHppYW5pc3NoZWthIiwiYSI6ImNpcDhwYm05MDAwMTd4Zm03NGJxZndycTcifQ.IK-4u9dfYd_K3znDEOh9NQ'

    L.tileLayer(
        'https://api.mapbox.com/styles/v1/dzianissheka/citdc4so800852hrzvz9actch/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZHppYW5pc3NoZWthIiwiYSI6ImNpcDhwYm05MDAwMTd4Zm03NGJxZndycTcifQ.IK-4u9dfYd_K3znDEOh9NQ',
        {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'your.mapbox.project.id',
            accessToken,
        }).addTo(mymap);

    var testMarker = L.marker([53.8998, 27.5511], {
        icon: new L.NumberedDivIcon({number: '0'})
    }).bindPopup('This is test marker');
    testMarker.addTo(mymap)

    studios.forEach((studio) => {
        var marker = L.marker([studio.coords[1], studio.coords[0]], {
            icon: new L.NumberedDivIcon({number: studio.n})
        }).bindPopup(getPlacePopup(studio));

        marker.addTo(mymap)
    })

    lines.forEach(line => {
        "use strict";
        L.geoJSON(line, {
            style: function(feature) {
                return {color: feature.properties.color};
            }
        }).bindPopup(function(layer) {
            return layer.feature.properties.description;
        }).addTo(mymap);
    })

    $('.js-artist-link').on('click', function (e) {
        var $this = $(this)
        console.log('id', $this.data('id'))

        showArtist($this.data('id'))



        return false
    })


    $('#map').on('click', '.js-artist-link', function (e) {
        var $this = $(this)
        console.log('id', $this.data('id'))

        showArtist($this.data('id'))

        return false
    })

    mymap.on('popupopen', function () {
        console.log('popupopen')
    })

    window.map = mymap

})
