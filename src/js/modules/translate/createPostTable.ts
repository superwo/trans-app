import { createModalContent } from "./createModalContent";
import { createPostsList } from "./functions/createPostsList";
import { parseTrString } from "./functions/parseTrString";

export function createPostTable(data: any, app: HTMLElement) {
  const postsList = createPostsList(data);
  const languages = data.languages;
  const defaultLanguage = data.default_language;

  // data is an object {languages: string[], default_language: string, page: any[], post: any[] .... other custom post types}
  // 1. Create a table element with bootstrap classes
  const table = document.createElement("table");
  table.classList.add(
    "table",
    "table-striped",
    "table-bordered",
    "table-hover"
  );
  // 2. Create a thead element and append it to the table
  const thead = document.createElement("thead");
  table.appendChild(thead);
  // 3. Create a tr element and append it to the thead
  const tr = document.createElement("tr");
  thead.appendChild(tr);
  // 4. Create th elements for the table headings
  const headings = ["ID", "Type", "Title", "Actions"];

  headings.forEach((heading) => {
    const th = document.createElement("th");
    th.textContent = heading;
    tr.appendChild(th);
  });
  // 5. Create a tbody element and append it to the table
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);
  // 6. Create a tr element for each post and append it to the tbody
  postsList.forEach((post: any) => {
    const tr = document.createElement("tr");
    tbody.appendChild(tr);
    // 7. Create a td element for each post property and append it to the tr
    const td = document.createElement("td");
    td.textContent = post.id;
    tr.appendChild(td);
    const td2 = document.createElement("td");
    td2.textContent = post.type;
    tr.appendChild(td2);
    const td3 = document.createElement("td");
    td3.textContent = parseTrString(post.title, defaultLanguage)[defaultLanguage];
    tr.appendChild(td3);
    const td5 = document.createElement("td");
    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-primary", "btn-sm");
    editBtn.textContent = "Translate";
    editBtn.setAttribute("data-bs-toggle", "modal");
    editBtn.setAttribute("data-bs-target", "#trModal");

    editBtn.onclick = () => {
      createModalContent(post, languages, defaultLanguage);
    };
    td5.appendChild(editBtn);
    tr.appendChild(td5);
  });

  app.appendChild(table);
}
