const options = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
}
function formatDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  try {
    return new Intl.DateTimeFormat("en-US", options).format(date)
  } catch (error) {
    console.log(error)
  }
  return false
}
export default formatDate
