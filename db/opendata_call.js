const x = "-122.417488323639";
const y = "37.7651818039906";
const category = "ASSAULT";


fetch(`https://data.sfgov.org/resource/cuks-n6tp.json?x=${x}&y=${y}&category=${category}`, {
  method: 'GET',
}).then(res => {
  return res.json()
}).then(data => {
  try {
    console.log("Number of " + (data[0].category).toLowerCase() + " crime: " + data.length);
  }
  catch(e) {
    console.log('no data');
  }
}).catch(e => {
  console.log('Request failed', e);
})