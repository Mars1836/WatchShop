const options = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};
function formatDate(date) {
  if (date instanceof Date) {
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }
  console.log("Input must be instanceof date");
  return false;
}
export default formatDate;
