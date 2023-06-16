const express = require('express')

const app = express()

app.use(express.json())

app.get('/api/distance', (req, res) => {

  let reqBody = req.body

  let lat1 = reqBody.origin.latitude
  let lon1 = reqBody.origin.longtitude

  let lat2 = reqBody.destination.latitude
  let lon2 = reqBody.destination.longtitude
  
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI/180; // φ, λ in radians
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;
  
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
  Math.cos(φ1) * Math.cos(φ2) *
  Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
  const d = R * c; // in metres

  res.header('Access-Control-Allow-Origin', '*')
  res.send({d})

})

app.listen(3000, () => {
  console.log('running...')
})
