const options = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};
function formatDate(date) {
  if (date instanceof Date) {
    try {
      return new Intl.DateTimeFormat("en-US", options).format(date);
    } catch (error) {
      console.log(error);
    }
  }
  console.log("Input must be instanceof date");
  return false;
}
export default formatDate;
