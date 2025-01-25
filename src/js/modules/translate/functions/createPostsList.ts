export function createPostsList(data: any) {
  let normalizedData = { ...data };
  delete normalizedData.languages;
  delete normalizedData.default_language;

  const result = Object.entries(normalizedData).flatMap(([key, value]) =>
    (value as any[]).map((item) => ({ ...item, type: key }))
  );
  return result;
}
