import { parseTrString } from "./functions/parseTrString";

export function createModalContent(
    postData: any,
    languages: string[],
    defaultLanguage: string
) {
    const modalEl = document.getElementById("trModal");
    if (modalEl === null) return;
    const modalTitle = modalEl.querySelector("#trModalTitle");
    const modalBody = modalEl.querySelector("#trModalBody");
    const modalFooter = modalEl.querySelector(".modal-footer");
    if (modalTitle === null || modalBody === null || modalFooter === null)
        return;
    const parsedTitle = parseTrString(postData.title, defaultLanguage);
    modalTitle.textContent = parsedTitle[defaultLanguage];
    const parsedContent = parseTrString(postData.content, defaultLanguage);

    modalBody.innerHTML = "";

    const titleRowDiv = document.createElement("div");
    titleRowDiv.classList.add("row");

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("col-12");
    const titleLabel = document.createElement("h5");
    titleLabel.textContent = "Title";
    titleDiv.appendChild(titleLabel);
    titleRowDiv.appendChild(titleDiv);

    languages.forEach((lang) => {
        const colDiv = document.createElement("div");
        colDiv.classList.add("col", "d-flex", "align-items-center");
        const label = document.createElement("label");
        label.textContent = lang;
        label.classList.add("me-2"); // Add margin to the right of the label
        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("form-control", "flex-grow-1");
        input.value = parsedTitle[lang] || "";
        colDiv.appendChild(label);
        colDiv.appendChild(input);
        titleRowDiv.appendChild(colDiv);
    });

    modalBody.appendChild(titleRowDiv);

    // Adding a new row for content
    const contentRowDiv = document.createElement("div");
    contentRowDiv.classList.add("row", "mt-3");

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("col-12");
    const contentLabel = document.createElement("h5");
    contentLabel.textContent = "Content";
    contentDiv.appendChild(contentLabel);
    contentRowDiv.appendChild(contentDiv);

    languages.forEach((lang) => {
        const colDiv = document.createElement("div");
        colDiv.classList.add("col", "d-flex", "align-items-center");
        const label = document.createElement("label");
        label.textContent = lang;
        label.classList.add("me-2");
        const textarea = document.createElement("textarea");
        textarea.classList.add("form-control", "flex-grow-1");
        textarea.value = parsedContent[lang] || "";
        colDiv.appendChild(label);
        colDiv.appendChild(textarea);
        contentRowDiv.appendChild(colDiv);
    });

    modalBody.appendChild(contentRowDiv);
}
