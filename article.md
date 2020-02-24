title: "Data z mobilů:<br>Praha se denně nafoukne o polovinu, v centru jsou návštěvníci v převaze"
perex: "Skoro 140 tisíc lidí přijede do Prahy každý den za prací. Míří hlavně do kancelářských budov a do centra města. S nimi pak dorazí i přes půl milionu návštěvníků. Ukázala to analýza dat o pohybu mobilních telefonů, kterou si nyní město nechává zpracovat."
coverimg: https://interaktivni.rozhlas.cz/brexit/media/cover.jpg
coverimg_note: "Foto <a href='https://ctk.cz'>ČTK</a>"
styles: ['https://cdnjs.cloudflare.com/ajax/libs/mapbox-gl/1.7.0/mapbox-gl.css']
libraries: ['https://cdnjs.cloudflare.com/ajax/libs/mapbox-gl/1.7.0/mapbox-gl.js', 'https://cdnjs.cloudflare.com/ajax/libs/d3/5.15.0/d3.min.js'] #jquery, d3, highcharts, datatables
options: [noheader, nopic] #wide, noheader (, nopic)
---
<wide>
	<form action="?" id='frm-geocode'>
		<div class="inputs">
		<input type="text" id="inp-geocode" placeholder="Zadejte obec či adresu...">
		<input type="submit" id="inp-btn" value="Najít">
		</div>
	</form>
	<div id="mapa_billboardy"></div>
</wide>