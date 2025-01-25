import { createPlaceholders } from "./functions/createPlaceholders";
import { normalizeFields } from "./functions/normalizeFields";
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
    const dataToTranslate = {} as { [key: string]: string };
    dataToTranslate.id = postData.id;
    dataToTranslate.title = postData.title;
    dataToTranslate.content = postData.content;
    const parsedTitle = parseTrString(postData.title, defaultLanguage);
    modalTitle.textContent = parsedTitle[defaultLanguage];
    const parsedContent = parseTrString(postData.content, defaultLanguage);
    const acfFields = normalizeFields(postData.fields, postData.acf_fields);

    modalBody.innerHTML = "";

    const titleRowDiv = document.createElement("div");
    titleRowDiv.classList.add("row");

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("col-12");
    const titleLabel = document.createElement("h5");
    titleLabel.textContent = "Title";
    titleLabel.classList.add("mb-2");
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
    contentLabel.classList.add("mb-2");
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

    acfFields.forEach((field: any) => {
        const key = Object.keys(field)[0];
        const value = field[key];
        console.log(key, value);
        dataToTranslate[key] = value;
        const parsedValue = parseTrString(value, defaultLanguage);
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row", "mt-3");

        const fieldDiv = document.createElement("div");
        fieldDiv.classList.add("col-12");
        const fieldLabel = document.createElement("h5");
        fieldLabel.textContent = key;
        fieldLabel.classList.add("mb-2");
        fieldDiv.appendChild(fieldLabel);
        rowDiv.appendChild(fieldDiv);

        languages.forEach((lang) => {
            const colDiv = document.createElement("div");
            colDiv.classList.add("col", "d-flex", "align-items-center");
            const label = document.createElement("label");
            label.textContent = lang;
            label.classList.add("me-2");
            const textarea = document.createElement("textarea");
            textarea.classList.add("form-control", "flex-grow-1");
            textarea.value = parsedValue[lang] || "";
            colDiv.appendChild(label);
            colDiv.appendChild(textarea);
            rowDiv.appendChild(colDiv);
        });

        modalBody.appendChild(rowDiv);
    });

    let the_text =
        "Please fill in only the empty placeholders within the provided fields, ensuring that all original tags, new lines, and formatting remain intact. Do not alter or overwrite any already filled placeholders, and maintain the structure and formatting of the content as provided. Remove this instruction text before saving the translation.\n\n";
    the_text += JSON.stringify(createPlaceholders(dataToTranslate, languages));

    // create a big textarea  to display the text
    const textArea = document.createElement("textarea");
    textArea.classList.add("form-control", "mt-3");
    textArea.rows = 10;
    textArea.value = the_text;
    modalBody.appendChild(textArea);
    // create a button to copy the text to the clipboard
    const copyBtn = document.createElement("button");
    copyBtn.classList.add("btn", "btn-primary", "mt-3");
    copyBtn.textContent = "Copy to Clipboard";
    copyBtn.onclick = () => {
        textArea.select();
        document.execCommand("copy");
    };
    modalBody.appendChild(copyBtn);

    // create a new textarea to display the translation
    const translationTextArea = document.createElement("textarea");
    translationTextArea.classList.add("form-control", "mt-3");
    translationTextArea.rows = 10;
    modalBody.appendChild(translationTextArea);

    const saveBtn = document.createElement("button");
    saveBtn.classList.add("btn", "btn-primary", "mt-3");
    saveBtn.textContent = "Save Translation";
    saveBtn.onclick = () => {
        // get the values from the textareas

        const base_url = document
            .getElementById("trApp")
            ?.getAttribute("data-url");
        const api_url = base_url + "wp-json/tr/v1/update-post";
        fetch(api_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(translationTextArea.value),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    modalBody.appendChild(saveBtn);
}
