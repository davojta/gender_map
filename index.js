"use strict";
require('./map')

var localJs = [
    'data/artists.js',
    'data/lines.js',
    'data/studios.js'
]

var localCss = [
    'map.css'
]



var outerCss = [
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
    'https://unpkg.com/leaflet@1.0.0-rc.3/dist/leaflet.css'
]

var outerJs = [
    'https://unpkg.com/leaflet@1.0.0-rc.3/dist/leaflet.js',
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',

]

var RESOURSE_PATH_URL = 'https://davojta.github.io/gender_map/'

function detectDomain() {
    var domain = document.domain

    if (domain === 'localhost')  {
        return '.'
    }

    return RESOURSE_PATH_URL
}

var domain = detectDomain()

var prLocalCss = localCss.map(url => {
    return `${domain}/${url}`
})

var prLocalJs = localJs.map(url => `${domain}/${url}`)
