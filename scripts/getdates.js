let year = new Date().getFullYear();
let oLastModif = new Date(document.lastModified);

oLastModif = new Intl.DateTimeFormat("en-US", {
  dateStyle: "full",
  timeStyle: "short", 
}).format(oLastModif);

document.getElementById("currentyear").textContent = `${year}`;
document.getElementById("lastModified").textContent = `Last Modification: ${oLastModif}`;
