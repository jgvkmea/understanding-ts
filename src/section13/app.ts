import axios from "axios";

const form13 = document.querySelector("form")!;
const addressEl13 = document.getElementById("address")! as HTMLInputElement;

type googleGeoResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

const GOOGLE_MAP_API_KEY = process.env.GOOGLE_MAP_API_KEY; // 漏洩防止のため.envファイルから読み込む

// Google Maps APIを動的に読み込む関数
// APIキーをenvファイルから読み込んでいるのでここでGoogle Map APIを初期化する
function loadGoogleMapsAPI(): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&v=weekly&libraries=marker`;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Google Maps API could not load."));
    document.head.appendChild(script);
  });
}
loadGoogleMapsAPI();

// declare var google: any; // @types/google.maps をインストールしない場合には必要

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
      const coordinates = res.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map")!, {
        center: coordinates,
        zoom: 16,
        mapId: "DEMO_MAP_ID",
      });
      new google.maps.marker.AdvancedMarkerElement({
        map,
        position: coordinates,
      });
    })
    .catch((error) => {
      alert(error.message);
      console.log(error);
    });
}

form13.addEventListener("submit", searchAddressHandler);
