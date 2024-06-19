import { useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Indicator from './components/Indicator';
import Sunrise from './components/Sunrise';
import Sunset from './components/Sunset';
import BasicTable from './components/BasicTable';


function App() {
  const [count, setCount] = useState(0)

  return (
	
    <Grid container spacing={5}>
	      <Grid xs={12} sm={4} md={3} lg={2}>1</Grid>
	      <Grid xs={6} sm={4} md={3} lg={2}>2</Grid>
	      <Grid xs={6} sm={4} md={3} lg={2}>3</Grid>
	      <Grid xs={12} sm={4} md={3} lg={2}>4</Grid>
	      <Grid xs={6} sm={4} md={6} lg={2}>5</Grid>
	      <Grid xs={6} sm={4} md={6} lg={2}>6</Grid>
		  <Grid xs={6} sm={4} md={3} lg={4}>
	        <Sunrise></Sunrise>
	      </Grid> 
		  <Grid xs={6} md={4} lg={4}>
	        <Indicator title='Hora Actual' subtitle='Igual Hace calor' value={0.13} />
	      </Grid>
		  <Grid xs={6} sm={4} md={3} lg={4}>
	        <Sunset></Sunset>
	      </Grid>  
		  <Grid xs={12} md={6} lg={8} >
	       	<BasicTable />
	      </Grid>     
	</Grid>
	
  )
}

export default App
