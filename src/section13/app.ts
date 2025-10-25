import axios from "axios";

const form13 = document.querySelector("form")!;
const addressEl13 = document.getElementById("address")! as HTMLInputElement;

type googleGeoResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

const GOOGLE_MAP_API_KEY = process.env.GOOGLE_MAP_API_KEY;

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress13 = addressEl13.value;

  axios
    .get<googleGeoResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress13
      )}&key=${GOOGLE_MAP_API_KEY}`
    )
    .then((res) => {
      if (res.data.status != "OK") {
        throw new Error("結果が0件でした");
      }
      const coor = res.data.results[0].geometry.location;
      console.log(res.data.results);
      console.log(coor);
    })
    .catch((error) => {
      alert(error.message);
      console.log(error);
    });
}

form13.addEventListener("submit", searchAddressHandler);
