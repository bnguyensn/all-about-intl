export function getJSONDownloadLink(obj: object): string {
  return `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(obj, null, 2))}`;
}
