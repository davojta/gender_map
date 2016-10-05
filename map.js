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
    hash[artist.id] = artist
    return hash
}, {})



function showArtist() {
    var $this = $(this)
    console.log('dom el', $(this), $this.attr('href'))

    return false

}
function getPlacePopup(place) {
    var artistsHtml = place.artists
        .map((artistId) => artists[artistId])
        .map((artist) => {
            return `<li class="artist"><img src="data/${artist.photo}" class="img-responsive img-circle artist-photo" alt="${artist.name}'s photo"/><a href="#${artist.id}" class="artist-name js-artist-link">${artist.name} </a></li>`
        })
    return `
<p>Художницы:</p>
<ul class="list-unstyled">
${artistsHtml.join('')}
</ul>            
`
}






$(function() {

    jQuery('document').on('click', '.js-artist-link', function () {
        var $this = $(this)
        console.log('dom el', $(this), $this.attr('href'))

        return false
    })


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

    window.map = mymap

})
