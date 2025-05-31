let year = new Date().getFullYear();
let oLastModif = new Date(document.lastModified);
oLastModif = Intl.DateTimeFormat("en-US", {
  dateStyle: "full",
}).format(oLastModif);


document.getElementById(
  "currentyear"
).textContent = `${year}`;
document.getElementById(
  "lastModified"
).textContent = `Last Modification: ${oLastModif}`;


const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Rio de Janeiro Brazil",
    location: "Rio de Janeiro, Brazil",
    dedicated: "2022, May, 8",
    area: 29966,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rio-de-janeiro-brazil/400x250/6-743652dbbf1ab19966da7eb3c7570d08cfc3ab8b.jpeg"
  },
  {
    templeName: "Curitiba Brazil",
    location: "Curitiba, Brazil",
    dedicated: "2008, June, 1",
    area: 27850,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/curitiba-brazil/400x250/curitiba-brazil-temple-lds-852263-wallpaper.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/2019/400x250/6-Rome-Temple-2160338.jpg"
  },
];

createTempleCard(temples);

/*
Old - temples built before 1900
New - temples built after 2000
Large - temples larger than 90000 square feet
Small - temples smaller than 10000 square feet
Home - displays all the temples stored in the array.
*/
const oldLink = document.querySelector('#old');
const newLink = document.querySelector('#new');
const largeLink = document.querySelector('#large');
const smallLink = document.querySelector('#small');
const homeLink = document.querySelector('#home');


oldLink.addEventListener("click", () => {
    const filteredTemples = temples.filter((temple) => {
    const year = parseInt(temple.dedicated.split(",")[0].trim());
    return year < 1900
  });
  createTempleCard(filteredTemples);
});

newLink.addEventListener("click", () => {
  const filteredTemples = temples.filter((temple) => {
    const year = parseInt(temple.dedicated.split(",")[0].trim());
    return year > 2000
  });
  createTempleCard(filteredTemples);
});

largeLink.addEventListener("click", () => {
  let filteredTemples = temples.filter(temple => temple.area > 90000)
  createTempleCard(filteredTemples);
});

smallLink.addEventListener("click", () => {
  let filteredTemples = temples.filter(temple => temple.area < 10000)
  createTempleCard(filteredTemples);
});

homeLink.addEventListener("click", () => {
  createTempleCard(temples);
});

function createTempleCard(filteredTemples){
  document.querySelector(".album").innerHTML = ""
  filteredTemples.forEach(temple => {
    let templeCard = document.createElement('div');
    let name = document.createElement('h3');
    let location = document.createElement('p');
    let dedicated = document.createElement('p');
    let area = document.createElement('p');
    let img = document.createElement('img');

    templeCard.classList.add('temple-card');
    name.textContent = temple.templeName;
    location.textContent = `Location: ${temple.location}`;
    dedicated.textContent = `Dedicated: ${temple.dedicated}`;
    area.textContent = `Size: ${temple.area} sq. ft.`;
    img.setAttribute("src", temple.imageUrl)
    img.setAttribute("alt", `${temple.name} Temple`)
    img.setAttribute("loading", "lazy")
    
    templeCard.appendChild(name);
    templeCard.appendChild(location);
    templeCard.appendChild(dedicated);
    templeCard.appendChild(area);
    templeCard.appendChild(img);

    document.querySelector(".album").appendChild(templeCard)
    
  })
}