export const toLowerCaseIfAlpha = value => {
  return typeof value === "string" ? value.toLowerCase() : value;
};
export const moSort = (property, asc) => {
  return (a, b) => {
    if (
      toLowerCaseIfAlpha(a[property]) < toLowerCaseIfAlpha(b[property])
    ) {
      return asc ? -1 : 0;
    }
    return asc ? 0 : -1;
  };
};
