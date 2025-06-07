const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

window.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("productName");
  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.name;
    option.textContent = product.name.charAt(0).toUpperCase() + product.name.slice(1);
    select.appendChild(option);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const lastMod = new Date(document.lastModified);
  document.getElementById("lastModified").textContent =
    lastMod.toLocaleDateString("en-US") + " " + lastMod.toLocaleTimeString("en-US");
});
