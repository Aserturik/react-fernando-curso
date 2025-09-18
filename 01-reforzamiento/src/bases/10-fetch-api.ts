import type { GiphyRandomResponse } from "../data/giphy.response";

const API_KEY = "LZlSMkakeTJWFoyDmPUNgng4lhXnJEhz";

const myRequest = fetch(
  `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`
);

myRequest
  .then((response) => response.json())
  .then(({ data }: GiphyRandomResponse) => {
    const imageUrl = data.images.original.url;
    const imgElement = document.createElement("img");
    imgElement.src = imageUrl;

    document.body.append(imgElement);
  })
  .catch((err) => console.error(err));
