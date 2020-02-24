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
        'attribution': 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, geocoder <a href="https://.mapy.cz/">Mapy.cz</a>, data <a href="http://www.dicr.cz/">Drážní inspekce ČR</a>.'
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
    this.container.innerHTML = 'Pro zobrazení konkrétních míst přibližte mapu.'
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


/*
  map.addLayer(
    {
      'id': 'nehody-heat',
      'type': 'heatmap',
      'source': 'nehody',
      'maxzoom': 12,
      'paint': {
        // Increase the heatmap weight based on frequency and property magnitude
        'heatmap-weight': [
          'interpolate', ['linear'], ['+', ['get', 'ex'], ['get', 'tr'], ['get', 'lr']],
          0, 0,
          4, 1
        ],
        // Increase the heatmap color weight weight by zoom level
        // heatmap-intensity is a multiplier on top of heatmap-weight
        'heatmap-intensity': [
          'interpolate', ['linear'], ['zoom'],
          0, 1,
          15, 3
        ],
        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
        // Begin color ramp at 0-stop with a 0-transparancy color
        // to create a blur-like effect.
        'heatmap-color': [
          'interpolate', ['linear'], ['heatmap-density'],
          0.0, 'rgba(252,187,161,0)',
          0.2, 'rgb(252,146,114)',
          0.4, 'rgb(251,106,74)',
          0.6, 'rgb(239,59,44)',
          0.8, 'rgb(203,24,29)',
          1.0, 'rgb(153,0,13)'
        ],
        // polomer podle zoomu
        'heatmap-radius': [
          'interpolate', ['linear'], ['zoom'],
          0, 8,
          4, 20
        ],
        // prechod mezi heatmapou a body
        'heatmap-opacity': [
          'interpolate', ['linear'], ['zoom'],
          7, 1,
          10, 0
        ]
      }
    }
  )
  */

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
  if (map.getZoom() >= 8) {
    document.getElementById('legend').innerHTML = 'Kliknutím vyberte místo nehod.'
    map.getCanvas().style.cursor = 'default'
  } else {
    document.getElementById('legend').innerHTML = 'Pro zobrazení konkrétních míst přibližte mapu.'
    map.getCanvas().style.cursor = 'grab'
  }
})

function tratName (val) {
  if (val.length > 4) {
    return val
  } else {
    return `<i>bez jména</i>`
  }
}

map.on('click', e => {
  map.scrollZoom.enable()
  const d = map.queryRenderedFeatures(e.point, { layers: ['nehody-point'] })
  if (d.length > 0) {
    document.getElementById('legend').innerHTML = `<b>Komunikace ${d[0].properties.kom}, ${d[0].properties.stan}. km</b><br>Stav: ${d[0].properties.stav}<br>Typ zařízení: ${d[0].properties.typ}`
  }
})

gCode(map)
