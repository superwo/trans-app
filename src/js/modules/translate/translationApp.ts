import { createPostTable } from "./createPostTable";

export default async function translationApp() {
  // 1. Get the app div and get the base url from the data-url attribute
  const app = document.getElementById("trApp");
  if (app === null) return;
  const base_url = app.getAttribute("data-url");

  // 2. call the fetch function to get the data from the server
  const api_url = base_url + "wp-json/tr/v1/content";
  const response = await fetch(api_url);
  const data = await response.json();
  console.log(data);

  // 3. Create the table with rows representing the post data
  createPostTable(data, app);
}
