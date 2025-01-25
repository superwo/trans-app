export function parseTrString(trString: string, defaultLanguage: string) {
    // string format {:it}Un nuovo articolo{:}{:en}New Article!{:} or Nuovo articolo
    //  return an object {it: "Un nuovo articolo", en: "New Article!"} if string is 'nuovo articolo' return {defaultLanguage: "nuovo articolo"}
    const regex = /{:(\w\w)\}(.+?){:}/g;
    const matches = Array.from(trString.matchAll(regex));
    let result: any = {};
    for (const match of matches) {
        result[match[1]] = match[2];
    }
    if (Object.keys(result).length === 0) {
        result[defaultLanguage] = trString;
    }
    return result;
}