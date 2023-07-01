// map variable
var myMap = new L.Map("map", {
  key: "web.d8211fffbc5a4af68eed4a0f110edb0c",
  maptype: "dreamy",
  poi: true,
  center: [35.699739, 51.338097],
  zoom: 10,
  traffic: true,
  onPoiLayerSwitched: function (state) {
    console.log();
  },
});

// marker image
var greenIcon = L.icon({
  iconUrl: "./assets/person.png",
  shadowUrl: "",
  iconSize: [30, 30], // size of the icon+
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [15, 30], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
});

// popup
const para = document.createElement("p");
const node = document.createTextNode("مشخصات راننده");
para.classList.add("popup");
para.appendChild(node);
const map = document.getElementById("map");
map.appendChild(para);

const log = () => {
  para.classList.contains("popupOn")
    ? para.classList.remove("popupOn")
    : para.classList.add("popupOn");
};

// marker
var marker = L.marker([35.699739, 51.338097], { icon: greenIcon })
  .addTo(myMap)
  .bindPopup(log);

myMap.on("click", (e) => {
  // L.marker([e.latlng.lat, e.latlng.lng]).addTo(myMap);
  L.Routing.control({
    waypoints: [
      L.latLng([35.699739, 51.338097]),
      L.latLng(e.latlng.lat, e.latlng.lng),
    ],
  })
    .on("routesfound", (e) => {
      e.routes[0].coordinates.forEach((coord, index) => {
        setTimeout(() => {
          marker.setLatLng([coord.lat, coord.lng]);
        }, 100 * index);
      });
    })
    .addTo(myMap);
});

// L.Routing.control({
//   waypoints: [
//     L.latLng([38.699739, 55.338097], { icon: greenIcon }),
//     L.latLng(36.699739, 50.338097),
//   ],
// }).addTo(myMap);

const func = () => {
  fetch(`https://api.neshan.org/v4/direction/no-traffic?type=car`, {
    method: "GET",
    "Api-Key": "web.d8211fffbc5a4af68eed4a0f110edb0c",
  }).then((response) => console.log(response));
};
