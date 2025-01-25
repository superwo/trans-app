export function createPlaceholders(
    fields: Record<string, any>,
    languages: string[]
) {
    const placeholders: Record<string, any> = {};

    for (const key in fields) {
        if (key === "id") {
            placeholders[key] = fields[key];
            continue;
        }

        let fieldValue = fields[key];
        const hasDelimiters = /\{:[a-z]{2}\}.*?\{:\}/.test(fieldValue);

        placeholders[key] = languages.reduce((acc, lang, index) => {
            if (index === 0 && !hasDelimiters) {
                acc += `{:${lang}}${fieldValue}{:}`;
            } else {
                const regex = new RegExp(`\{:${lang}\}.*?\{:\}`, "g");
                const match = fieldValue.match(regex);
                if (match) {
                    acc += match[0];
                } else {
                    acc += `{:${lang}}{:}`;
                }
            }
            return acc;
        }, "");
    }

    return placeholders;
}
