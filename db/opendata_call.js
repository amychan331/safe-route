const x = "-122.417488323639";
const y = "37.7651818039906";
const category = "ASSAULT";

fetch(`https://data.sfgov.org/resource/cuks-n6tp.json?x=${x}&y=${y}&category=${category}`, {
  method: 'GET',
}).then(res => {
  return res.json()
}).then(data => {
  try {
    let crime = data.filter( incident => {
        let differences = new Date().getTime() - new Date(incident.date).getTime();
        return Math.floor(differences / (1000 * 60 * 60 * 24 * 7 * 4)) < 6;
    });
    console.log("Number of " + (data[0].category).toLowerCase() + " crime: " + crime.length);
  }
  catch(e) {
    console.log('no data');
  }
}).catch(e => {
  console.log('Request failed', e);
})