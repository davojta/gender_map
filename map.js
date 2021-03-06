var $ = require('jquery')

var artists = require('./data/artists')
var lines = require('./data/lines')
var studios = require('./data/studios')
var L = require('leaflet')
require('leaflet_css')
require('bootstrap-loader');

var $ = require('jquery')

var PATH = 'https://davojta.github.io/gender_map/'
if (__PROD__) {
    PATH = 'https://davojta.github.io/gender_map/'
} else {
    PATH = '.'
}


require('./map.css')

import yellowBigSvg from './images/YELLOW.svg'
import holeSvg from './images/marker_hole.svg'

L.NumberedDivIcon = L.Icon.extend({
      options: {
      // EDIT THIS TO POINT TO THE FILE AT http://www.charliecroom.com/marker_hole.png (or your own marker)
      iconUrl: holeSvg,
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

      var numDivClass = 'number';
      if (this.options.size === 'big') {

          this.options.iconUrl= yellowBigSvg
          this.options.iconSize = new L.Point(34, 55)
          this.options.iconAnchor = new L.Point(19, 56),
              numDivClass += ' start-line-number'
      }

      var img = this._createImg(this.options['iconUrl']);
      var numdiv = document.createElement('div');

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
    if (artist.text.length === 0) artist.text = 'Нет информации о художнице'
    if (!artist.studio_photoes) artist.studio_photoes = []
    hash[artist.id] = artist
    return hash
}, {})

function getStudioPhotoesHtml(artistId, photoes) {
    var html = photoes.map( photo => {
        return `<img alt="" data-src="holder.js/140x140" class="img-rounded studio-photo" src="${PATH}/data/studio_photoes/${artistId}/${photo}" >`
    }).join('')

    return html
}

function showArtist(artistId) {
    var artist = artists[artistId]
    $('#artistModal').modal('show')

    $('#artistModalLabel').text(artist.name)
    $('#artistText').text(artist.text)
    $('#artistModalPhoto').attr('src', `${PATH}/data/${artist.photo}`)
    $('#studioPhotoes').html(getStudioPhotoesHtml(artistId, artist.studio_photoes))
}
function getPlacePopup(place) {
    var artistsHtml = place.artists
        .map((artistId) => artists[artistId])
        .map((artist) => {
            return `<li class="artist"><img src="${PATH}/data/${artist.photo}" class="img-responsive img-circle artist-photo" alt="${artist.name}'s photo"/>   <a href="#${artist.id}" data-id="${artist.id}"  class="artist-name js-artist-link">${artist.name} </a></li>`
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

    var linesList = lineStarts.map(lineStart => {
        var fullStudios = lineStart.studios.map(studioId => {
            return studios.find(studio => studio.id === studioId)
        })

        var studiosHtml = fullStudios.map(studio => {
            return `<li><a href="#${studio.id}">${studio.address}</a></li>`
        }).join('')

        return `
<dt class="line-list-number">${lineStart.n}</dt>
<dd><ul class="list-unstyled line-studios-list">${studiosHtml}</ul></dd>
`
    })

    return  `
<h2>Маршруты</h2>
<dl class="line-list">
    ${linesList}
</dl> 
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
            'surhanava',
            'niakrasava',
            'belamorskaja'
        ]
    },
    {
        coords: [
            27.578998804092407,
            53.909615636392466
        ],
        n: 'II',
        address: 'ул. Козлова, 2',
        studios: [
            'kazlova',
            'kisialiova',
            'pershamajaskaja'
        ]
    },
    {
        coords: [
            27.55192458629608,
            53.89188445293951
        ],
        n: 'III',
        address: 'ул. Кирова, 2',
        studios: [
            'kirava',
            'nezalezhnasci',
            'rakauskaja',
            'tanka',
            'staravilenski'
        ]
    }
]


$(function() {
    $('body').append(
        `
<div class="modal fade" id="artistModal" tabindex="-1" role="dialog" aria-labelledby="artistModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="artistModalLabel">New message</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-4">
                        <div class="image-wrapper" >
                            <img id="artistModalPhoto" src="" alt="Artist Photo" class="img-responsive img-circle">&nbsp;
                        </div>


                    </div>
                    <div class="col-md-8">
                        <div id="artistText" class="artist-text">&nbsp;</div>

                    </div>
                </div>
                <div class="row images-list">
                    <div class="col-md-12">
                        <div id="studioPhotoes" class="studio-photoes">
                            &nbsp;
                        </div>

                    </div>
                </div>


            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
            </div>
        </div>
    </div>
</div>



`
    )



    var mymap = L.map('map', {
        center: [53.917356840722235, 27.563881874084476],
        zoom: 13
    })
    var control = new PlacesList()
    control.addTo(mymap)

    var tileUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    var mapboxUrl = 'https://api.mapbox.com/styles/v1/dzianissheka/citdc4so800852hrzvz9actch/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZHppYW5pc3NoZWthIiwiYSI6ImNpcDhwYm05MDAwMTd4Zm03NGJxZndycTcifQ.IK-4u9dfYd_K3znDEOh9NQ'

    L.tileLayer(
        tileUrl,
        {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            minZoom: 12,
            maxZoom: 15,
            id: 'gender_map',
        }).addTo(mymap);


    var startsMarkers = lineStarts.map((lineStart) => {
        var marker = L.marker([lineStart.coords[1], lineStart.coords[0]], {
            icon: new L.NumberedDivIcon({
                number: lineStart.n,
                size: 'big'
            })
        })
        //.bindPopup(getLineStartPopup(lineStart));

        return marker
    })
    var lineStartsLayer = L.layerGroup(startsMarkers)
        .addTo(mymap);




    var studiosMarkers = studios.map((studio) => {
        var marker = L.marker([studio.coords[1], studio.coords[0]], {
            icon: new L.NumberedDivIcon({number: studio.n}),
            studioId: studio.id
        }).bindPopup(getPlacePopup(studio));

        return marker

        //marker.addTo(mymap)
    })
    var studiosLayer = L.layerGroup(studiosMarkers)
    window.lg = studiosLayer

    var linePolylines = lines.map(line => {
        return L.geoJSON(line, {
            style: function(feature) {
                return {color: feature.properties.color};
            }
        })
        //     .bindPopup(function(layer) {
        //     return layer.feature.properties.description;
        // })
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
       getLinesListHtml(lineStarts)
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

    window.addEventListener("hashchange", function(){
        openStudioPopup(location.hash.substr(1));
    })


    function openStudioPopup(studioId){
        for (var b in studios) {
            if (studios[b].id === studioId) {
                var studioCoordinates = studios[b].coords
                mymap.setView([studioCoordinates[1], studioCoordinates[0]], 14)
                break
            }
        }

        setTimeout(function() {
            for (var i in studiosMarkers) {
                var markerID = studiosMarkers[i].options.studioId
                if (markerID === studioId) {
                    studiosMarkers[i].openPopup()
                    break
                }
            }
        }, 300)
    }

    window.map = mymap

})
