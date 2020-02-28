/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable new-cap */
import './byeie' // loučíme se s IE
import { gCode } from './gcode'

let host = 'https://data.irozhlas.cz/billboardy-mapa'
if (window.location.hostname === 'localhost') {
  host = 'http://localhost/billboardy-mapa'
}

const map = new mapboxgl.Map({
  container: 'mapa_billboardy',
  minZoom: 5,
  maxZoom: 16,
  style: {
    'version': 8,
    'sources': {
      'raster-tiles': {
        'type': 'raster',
        'tiles': [
          'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
        ],
        'tileSize': 256,
        'attribution': 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, geocoder <a href="https://.mapy.cz/">Mapy.cz</a>, data <a href="https://www.rsd.cz/wps/portal/">Ředitelství silnic a dálnic</a>.'
      }
    },
    'layers': [
      {
        'id': 'simple-tiles',
        'type': 'raster',
        'source': 'raster-tiles',
        'minzoom': 4,
        'maxzoom': 22
      }
    ]
  },
  center: [15.33507, 49.74175],
  zoom: 6
})
map.scrollZoom.disable()
map.addControl(new mapboxgl.NavigationControl())

class Legend {
  onAdd (map) {
    this.map = map
    this.container = document.createElement('div')
    this.container.id = 'legend'
    this.container.innerHTML = 'Pro detail klikněte na bod v mapě.'
    return this.container
  }

  onRemove () {
    this.container.parentNode.removeChild(this.container)
    this.map = undefined
  }
}
const legend = new Legend()
map.addControl(legend, 'top-left')

map.on('load', () => {
  map.addSource('nehody', {
    'type': 'geojson',
    'data': host + '/data/data.json'
  })

  map.addLayer(
    {
      'id': 'nehody-point',
      'type': 'circle',
      'source': 'nehody',
      'minzoom': 5,
      'paint': {
        'circle-radius': 8,
        // barva podle stavu zarizeni
        'circle-color': [
          'match', 
          ['get', 'stav'],
          'odstraněno',
          'rgba(49,130,189,0.5)',
          'řešeno',
          'rgba(222,45,38,0.5)',
          'dílčí odstranění',
          'rgba(230,85,13,0.5)',
          'rgba(99,99,99,0.5)'
        ],
        'circle-stroke-color': 'white',
        'circle-stroke-width': 1,
        // prechod priuhlednosti mezi heatmapou a body
        'circle-opacity': [
          'interpolate', ['linear'], ['zoom'],
          7, 1,
          8, 1
        ]
      }
    }
  )
})

map.on('zoomend', e => {
  document.getElementById('legend').innerHTML = 'Kliknutím vyberte místo nehod.'
  map.getCanvas().style.cursor = 'default'
})

function tratName (val) {
  if (val.length > 4) {
    return val
  } else {
    return `<i>bez jména</i>`
  }
}

function nicer(v) {
  if (v) {
    return ', ' + v + ' km'
  } else {
    return ''
  }
}

map.on('click', e => {
  map.scrollZoom.enable()
  const d = map.queryRenderedFeatures(e.point, { layers: ['nehody-point'] })
  if (d.length > 0) {
    document.getElementById('legend').innerHTML = `<b>Silnice č. ${d[0].properties.kom}${nicer(d[0].properties.stan)}</b><br>Stav: ${d[0].properties.stav}<br>Typ zařízení: ${d[0].properties.typ || 'neznámý'}`
  }
})

gCode(map)
