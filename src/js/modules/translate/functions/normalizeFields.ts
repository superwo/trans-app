export function normalizeFields(fields: any, acf_fields: any) {
    return flattenFields(fields);

    function flattenFields(fields: any, prefix = "") {
        let result: Array<{ [key: string]: any }> = [];

        for (let key in fields) {
            if (fields[key] && typeof fields[key] === "object") {
                // Recursively flatten if the value is an object
                result = result.concat(
                    flattenFields(fields[key], prefix + key + "_")
                );
            } else {
                if (fields[key] && acf_fields[prefix + key]) {
                    // Create an object with a key that includes the prefix
                    result.push({
                        [prefix + key]: acf_fields[prefix + key][0],
                    });
                }
            }
        }

        return result;
    }
}
