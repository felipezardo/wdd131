let year = new Date().getFullYear();
let oLastModif = new Date(document.lastModified);
oLastModif = Intl.DateTimeFormat("en-US", {
  dateStyle: "full",
}).format(oLastModif);

document.getElementById("currentyear").textContent = `${year}`;
document.getElementById(
  "lastModified"
).textContent = `Last Modification: ${oLastModif}`;

const temperature = 10;
const windSpeed = 5;

function calculateWindChill(temperature, windSpeed) {
  return (
    13.12 +
    0.6215 * temperature -
    11.37 * Math.pow(windSpeed, 0.16) +
    0.3965 * temperature * Math.pow(windSpeed, 0.16)
  ).toFixed(1)
  ;
}
let windChill = calculateWindChill(temperature,windSpeed);

document.getElementById("temperature").textContent = `${temperature} ºC`;
document.getElementById("wind").textContent = `${windSpeed} km/h`;

if(temperature <= 10 && windSpeed > 4.8){
  document.getElementById("windChill").textContent = `${windChill} ºC`;
}
else{
  document.getElementById("windChill").textContent = `N/A`;
}