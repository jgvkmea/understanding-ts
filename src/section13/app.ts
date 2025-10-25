const form13 = document.querySelector("form")!;
const addressEl13 = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_MAP_API_KEY = process.env.GOOGLE_MAP_API_KEY;
console.log(GOOGLE_MAP_API_KEY);

function searchAddressHandler(event: Event) {
  event.preventDefault();
  // const address13 = addressEl13.value;
}

form13.addEventListener("submit", searchAddressHandler);
