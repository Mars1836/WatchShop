function getCookie(name) {
  const cookiesArray = document.cookie.split(";");
  if (!cookiesArray.length) {
    return undefined;
  }
  const cookies = cookiesArray.map((str) => {
    let [key, value] = str.split("=");
    if (!key || !value) {
      return undefined;
    }
    key = key.trim();
    value = value.trim();
    return { key, value };
  });
  if (name) {
    const c = cookies.find((ck) => {
      return ck?.key === name;
    });
    return c?.value;
  }
  return cookies;
}
export default getCookie;
