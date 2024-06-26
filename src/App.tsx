import { useState, useEffect } from 'react'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Indicator from './components/Indicator';
import Sunrise from './components/Sunrise';
import Sunset from './components/Sunset';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';


function App() {
	{/* Variable de estado y función de actualización */ }

	let [indicators, setIndicators] = useState([])

	{/* 
         1. Agregue la variable de estado (dataTable) y función de actualización (setDataTable).
     */}

	let [rowsTable, setRowsTable] = useState([])

	{/* Hook: useEffect */ }

	useEffect(() => {

		(async () => {


			{/* Del LocalStorage, obtiene el valor de las claves openWeatherMap y expiringTime */ }

			let savedTextXML = localStorage.getItem("openWeatherMap")
			let expiringTime = localStorage.getItem("expiringTime")

			{/* Estampa de tiempo actual */ }

			let nowTime = (new Date()).getTime();

			{/* Realiza la petición asicrónica cuando: 
				(1) La estampa de tiempo de expiración (expiringTime) es nula, o  
				(2) La estampa de tiempo actual es mayor al tiempo de expiración */}

			if (expiringTime === null || nowTime > parseInt(expiringTime)) {

				{/* Request */ }

				let API_KEY = "df5970be269c004ab3bc388388a53567"
				let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
				savedTextXML = await response.text();


				{/* Diferencia de tiempo */ }

				let hours = 1
				let delay = hours * 3600000


				{/* En el LocalStorage, almacena texto en la clave openWeatherMap y la estampa de tiempo de expiración */ }

				localStorage.setItem("openWeatherMap", savedTextXML)
				localStorage.setItem("expiringTime", (nowTime + delay).toString())
			}



			{/* XML Parser */ }

			const parser = new DOMParser();
			const xml = parser.parseFromString(savedTextXML, "application/xml");

			{/* Arreglo para agregar los resultados */ }

			let dataToIndicators = new Array()

			{/* 
             Análisis, extracción y almacenamiento del contenido del XML 
             en el arreglo de resultados
         	*/}

			const nombreElement = xml.getElementsByTagName("name")[0];
			const nombre = nombreElement.innerHTML;


			let location = xml.getElementsByTagName("location")[1]

			let geobaseid = location.getAttribute("geobaseid")
			dataToIndicators.push([nombre, "geobaseid", geobaseid])

			let latitude = location.getAttribute("latitude")
			dataToIndicators.push([nombre, "Latitude", latitude])

			let longitude = location.getAttribute("longitude")
			dataToIndicators.push([nombre, "Longitude", longitude])

			console.log(dataToIndicators)

			{/* Renderice el arreglo de resultados en un arreglo de elementos Indicator */ }

			let indicatorsElements = Array.from(dataToIndicators).map(
				(element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]} />
			)

			{/* Modificación de la variable de estado mediante la función de actualización */ }

			setIndicators(indicatorsElements)

			{/* 
                 2. Procese los resultados de acuerdo con el diseño anterior.
                 Revise la estructura del documento XML para extraer los datos necesarios. 
             */}

			let arrayObjects = Array.from(xml.getElementsByTagName("time")).map((timeElement) => {

				let rangeHours = timeElement.getAttribute("from").split("T")[1] + " - " + timeElement.getAttribute("to").split("T")[1]

				let windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + " " + timeElement.getElementsByTagName("windDirection")[0].getAttribute("code")

				return { "rangeHours": rangeHours, "windDirection": windDirection }

			})

			arrayObjects = arrayObjects.slice(0, 8)

			{/* 3. Actualice de la variable de estado mediante la función de actualización */ }

			setRowsTable(arrayObjects)

		})()


	}, [])

	{/* JSX */ }

	return (

		<Grid container spacing={5}>
			<Grid xs={6} sm={4} md={3} lg={4}>
				<Sunrise></Sunrise>
			</Grid>
			<Grid xs={6} md={4} lg={4}>
				<Indicator title='Hora Actual' subtitle='Igual Hace calor' value={0.13} />
			</Grid>
			<Grid xs={6} sm={4} md={3} lg={4}>
				<Sunset></Sunset>
			</Grid>
			<Grid xs={6} lg={2}>
				<Grid xs={6} lg={2}>

					{indicators[0]}

					{/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}

				</Grid>

				<Grid xs={6} lg={2}>

					{indicators[1]}

					{/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}

				</Grid>

				<Grid xs={6} lg={2}>

					{indicators[2]}

					{/* <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} /> */}

				</Grid>
			</Grid>

			<Grid xs={12} md={6} lg={10} >
				 {/* 4. Envíe la variable de estado (dataTable) como prop (input) del componente (BasicTable) */}
				 <BasicTable rows={rowsTable}></BasicTable>
			</Grid>
			<Grid xs={12} lg={3}>
				<ControlPanel />
			</Grid>
			<Grid xs={12} lg={9}>
				<WeatherChart></WeatherChart>
			</Grid>
		</Grid>

	)
}

export default App
