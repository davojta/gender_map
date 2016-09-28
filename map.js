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

var artists = [
    {
        id: 'm_shmatova',
        name: 'Марта Шматова',
        fb: '',
        link: ''
    },
    {
        id: 'i_kosobuko',
        name: 'Илона Кособуко',
        fb: '',
        link: ''
    },
    {
        id: 'e_sumareva',
        name: 'Екатерина Сумарева',
        fb: '',
        link: ''
    },
    {
        id: 't_radivilko',
        name: 'Татьяна Радивилко',
        fb: '',
        link: ''
    },
    {
        id: 'a_silivonchik',
        name: 'Анна Силивончик',
        fb: '',
        link: ''

    }

].reduce((hash, artist) => {
    hash[artist.id] = artist
    return hash
}, {})

var studios = [
    {
        coords: [
            27.590049505233765,
            53.927724646237046
        ],
        n: 1,
        address: 'ул Сурганова 42, 44',
        artists: [
            'm_shmatova',
            'i_kosobuko',
            'e_sumareva'

        ],
        landmark: 'болконы лодочки'
    },
    {
        coords: [
            27.59344518184662,
            53.93149268335978
        ],
        n: 2,
        address: 'ул Некрасова 11',
        artists: [
            't_radivilko'

        ],
        landmark: 'кафе Кавказкая пленница'
    },
    {
        coords: [
            27.588633298873898,
            53.92515978599045
        ],
        n: 3,
        address: 'ул Беломорская 21',
        artists: [
            'a_silivonchik'
        ],
        landmark: 'ЖК Флагман'
    }
]

var lines = [
    {
        "type": "Feature",
        "properties": {
            color: 'red',
            description: 'First line'
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [
                    27.590038776397705,
                    53.92773728062649
                ],
                [
                    27.591304779052734,
                    53.927345612775504
                ],
                [
                    27.59139060974121,
                    53.927509861031446
                ],
                [
                    27.59038209915161,
                    53.927857307135405
                ],
                [
                    27.590070962905884,
                    53.92821106746962
                ],
                [
                    27.59016752243042,
                    53.92833109261607
                ],
                [
                    27.58936285972595,
                    53.92862167838335
                ],
                [
                    27.58936285972595,
                    53.92873538530676
                ],
                [
                    27.59168028831482,
                    53.930832590789265
                ],
                [
                    27.592839002609253,
                    53.931938003071714
                ],
                [
                    27.593493461608887,
                    53.93169797317907
                ],
                [
                    27.593447864055634,
                    53.9314942625161
                ]
            ]
        }
    }
]

function getPlacePopup(place) {
    var artistsHtml = place.artists
        .map((artistId) => artists[artistId])
        .map((artist) => {
            return `<li><a onlick="void" href="#${artist.id}">${artist.name}</a></li>`
        })
    return `
<p>Художницы: </p>
<ul>
${artistsHtml}
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

    window.map = mymap

})
