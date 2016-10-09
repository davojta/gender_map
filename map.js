"use strict";

L.NumberedDivIcon = L.Icon.extend({
      options: {
      // EDIT THIS TO POINT TO THE FILE AT http://www.charliecroom.com/marker_hole.png (or your own marker)
      iconUrl: './images/marker_hole.png',
      number: '',
      shadowUrl: null,
      size: 'normal',
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
      var numDivClass = 'number';
      if (this.options.size === 'big') {
          this.options.className += ' start-line-icon'
          numDivClass += ' start-line-number'
      }
      numdiv.setAttribute("class", numDivClass);
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
    if (!artist.studio_photoes) artist.studio_photoes = []
    hash[artist.id] = artist
    return hash
}, {})

function getStudioPhotoesHtml(artistId, photoes) {
    var html = photoes.map( photo => {
        return `<img alt="" data-src="holder.js/140x140" class="img-rounded studio-photo" src="data/studio_photoes/${artistId}/small-${photo}" >`
    }).join('')

    return html
}


function showArtist(artistId) {
    var artist = artists[artistId]
    console.log('artist', artist.text)
    $('#artistModal').modal('show')

    $('#artistModalLabel').text(artist.name)
    $('#artistText').text(artist.text)
    $('#artistModalPhoto').attr('src', `data/${artist.photo}`)
    $('#studioPhotoes').html(getStudioPhotoesHtml(artistId, artist.studio_photoes))
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

function getLineStartPopup(lineStart) {
    return `Start for the line`
}

function getLinesListHtml(lineStarts) {
    return `


`
}

var PlacesList = L.Control.extend({
    options: {
        controlClass: 'js-map-control studios-list-control',
        minZoom: 12,
        maxZoom: 19,
        position: 'topright'
    },
    initialize: function() {
        L.Control.prototype.initialize.apply(this, arguments)

        this.container = undefined
        this._map = undefined
    },
    onAdd(map) {
        var container = L.DomUtil.create('div', this.options.controlClass)
        this.container = container

        this._map = map

        return this.container

    }
})


var lineStarts = [
    {
        coords: [
            27.590049505233765,
            53.927724646237046
        ],
        n: 'I',
        address: 'ул Сурганова 42 (44)',
        studios: [
            ''
        ]
    }
]




$(function() {
    var mymap = L.map('map', {
        center: [53.917356840722235, 27.563881874084476],
        zoom: 13
    })
    const accessToken = 'pk.eyJ1IjoiZHppYW5pc3NoZWthIiwiYSI6ImNpcDhwYm05MDAwMTd4Zm03NGJxZndycTcifQ.IK-4u9dfYd_K3znDEOh9NQ'

    var control = new PlacesList()
    control.addTo(mymap)

    L.tileLayer(
        'https://api.mapbox.com/styles/v1/dzianissheka/citdc4so800852hrzvz9actch/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZHppYW5pc3NoZWthIiwiYSI6ImNpcDhwYm05MDAwMTd4Zm03NGJxZndycTcifQ.IK-4u9dfYd_K3znDEOh9NQ',
        {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            minZoom: 11,
            maxZoom: 19,
            id: 'your.mapbox.project.id',
            accessToken,
        }).addTo(mymap);


    var startsMarkers = lineStarts.map((lineStart) => {
        var marker = L.marker([lineStart.coords[1], lineStart.coords[0]], {
            icon: new L.NumberedDivIcon({
                number: lineStart.n,
                size: 'big'
            })
        }).bindPopup(getLineStartPopup(lineStart));

        return marker
    })
    var lineStartsLayer = L.layerGroup(startsMarkers)
        .addTo(mymap);


    var studiosMarkers = studios.map((studio) => {
        var marker = L.marker([studio.coords[1], studio.coords[0]], {
            icon: new L.NumberedDivIcon({number: studio.n})
        }).bindPopup(getPlacePopup(studio));

        return marker

        //marker.addTo(mymap)
    })
    var studiosLayer = L.layerGroup(studiosMarkers)

    var linePolylines = lines.map(line => {
        return L.geoJSON(line, {
            style: function(feature) {
                return {color: feature.properties.color};
            }
        }).bindPopup(function(layer) {
            return layer.feature.properties.description;
        })
    })
    var linesLayer = L.layerGroup(linePolylines);
    linesLayer.addTo(mymap)

    mymap.on('zoomend', function () {
        var zoom = mymap.getZoom()

        if (zoom <= 13) {
            studiosLayer.removeFrom(mymap)
            lineStartsLayer.addTo(mymap)


        }

        if (zoom > 13) {
            lineStartsLayer.removeFrom(mymap)
            studiosLayer.addTo(mymap)
        }
    })

    $('.js-map-control').html(
        `
<h2>Маршруты</h2>
<dl>
    <dt>Первый</dt>
    <dd>
    <ul>
        <li>Сурганова</li>
    </ul>
    
    </dd>
    <dt>Второй</dt>
    <dd>
    <ul>
        <li>Козлова</li>
    </ul>
</dd>
    <dt>Третий</dt>
    <dd>
    <ul>
        <li>Кирова</li>
    </ul>
</dd>
</dl>        


`
    )

    $('.js-artist-link').on('click', function (e) {
        var $this = $(this)

        showArtist($this.data('id'))

        return false
    })


    $('#map').on('click', '.js-artist-link', function (e) {
        var $this = $(this)

        showArtist($this.data('id'))

        return false
    })

    window.map = mymap

})
