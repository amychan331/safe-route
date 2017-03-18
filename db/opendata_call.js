const x = "-122.417488323639";
const y = "37.7651818039906";
const category = "VEHICLE THEFT";


fetch(`https://data.sfgov.org/resource/cuks-n6tp.json?x=${x}&y=${y}&category=${category}`, {
  method: 'GET',
}).then(res => {
  return res.json()
}).then(data => {
  try {
    console.log(
      data
      // data.map(item => console.log(item.incidntnum.length))
    );
  }
  catch(e) {
    console.log('no data');
  }
}).catch(e => {
  console.log('Request failed', e);
})