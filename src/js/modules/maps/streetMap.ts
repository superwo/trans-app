import "leaflet";
export default function streetMap() {
  const map_address = document.querySelector("#map-address");
  const map_address_content = map_address?.textContent?.trim();
  const map_coords = document.querySelector("#map-coords");
  const map_coords_content = map_coords?.textContent?.trim();
  const map_zoom = document.querySelector("#map-zoom");
  const map_icon = document.querySelector("#map-icon");
  const zoom = map_zoom?.textContent?.trim();
  if (map_address_content?.length === 0 || map_coords_content?.length === 0) {
    alert(
      "Enter coords and address for streetMap from admin Footer fields map coords and adress text"
    );
  }
  const coords_array = map_coords_content?.split(",");
  if (coords_array && coords_array?.length !== 2) {
    alert("add right coords");
    return;
  }
  const lat = coords_array && coords_array[0] ? parseFloat(coords_array[0]) : 0;
  const long = coords_array && coords_array[1] ? parseFloat(coords_array[1]) : 0;
  const coords: number[] = [lat, long];
  if (coords.length === 0) {
    alert("No coordinates found for the map");
  }
  const addressText = map_address?.textContent;
  let map = L.map("map", {
    scrollWheelZoom: false,
  }).setView(coords, zoom ? parseInt(zoom) : 17);
  let myIcon = L.icon({
    iconUrl: map_icon?.textContent,
    iconSize: [32, 32],
    iconAnchor: [16, 32], // first divide iconSize first param by 2, second the same as iconSize last param
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });
  L.marker(coords, { icon: myIcon })
    .bindTooltip(addressText, {
      direction: "right",
      offset: [-10, -30],
      permanent: false,
    })
    .addTo(map);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 24,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}
