const coord1 = [37.7818248, -122.4039391];
const coord2 = [37.79589279999999, -122.40316029999997];
const category = "ASSAULT";

let coordinates = fetch(`https://data.sfgov.org/resource/cuks-n6tp.json?category=${category}&$where=within_box(location, ${coord1[0]}, ${coord1[1]}, ${coord2[0]}, ${coord2[1]})`, {
  method: 'GET',
}).then(res => {
  return res.json()
}).then(data => {
  try {
    let filtered_data = data.filter( incident => {
        let differences = new Date().getTime() - new Date(incident.date).getTime();
        return Math.floor(differences / (1000 * 60 * 60 * 24 * 7 * 4)) < 6;
    });
    return filtered_data.length;
  }
  catch(e) {
    return 'no data';
  }
}).catch(e => {
  return 'Request failed' + e;
})
coordinates.then(result => console.log(result));