export const encodeParameters = (params) => {
  return Object.entries(params)
    .map(([key, value]) => {
      return `${encodeURI(key)}=${encodeURI(value)}`;
    })
    .join("&");
};
