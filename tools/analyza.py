# %%
import pandas as pd
import json
from pyproj import Transformer

# %%
d = pd.read_excel('./billboardy_rsd_gis.xls')
it = d.to_dict(orient='index')

# %%
len(d)


# %%
d.STAV.value_counts(normalize=True)

# %%
d['TYP ZAŘÍZENÍ'].value_counts()
# %%
trans = Transformer.from_crs('EPSG:2065', 'EPSG:4326')

# %%
trans.transform(988245.0, 686795.0)

# %%
out = []
for v in list(it.values()):
    coords = trans.transform(v['Y'], v[' X'])
    out.append({'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [round(coords[1], 5), round(coords[0], 5)]
                },
                'properties': {
                    'kom': v['Č. KOM.'],
                    'stan': v['STANIČENÍ'],
                    'typ': v['TYP ZAŘÍZENÍ'],
                    'stav': v['STAV'],
                    'ku': v['KATASTRÁLNÍ ÚZEMÍ']
                }
})

# %%
v
# %%
with open('../data/data.json', 'w', encoding='utf-8') as f:
    f.write(json.dumps({
            'type': 'FeatureCollection',
            'features': out
}, ensure_ascii=False))

# %%
