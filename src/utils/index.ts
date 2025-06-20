export const processUrl = (url: string, obj: Record<string, any>) => {
  let qs = "";
  for (const key in obj) {
    if (!obj[key]) continue;
    if (qs.length > 0) qs += "&";
    qs += `${key}=${obj[key]}`;
  }
  qs = qs.replace(/ /g, "%20");
  if (!url.endsWith("/")) {
    url += "/";
  }
  return qs ? `${url}?${qs}` : url;
};
