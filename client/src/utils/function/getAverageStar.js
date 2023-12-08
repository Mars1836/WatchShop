function getAverageStar(feedbacks) {
  const sum = feedbacks.reduce((pre, cur) => {
    return pre + cur.star
  }, 0)
  const star = Math.round((sum * 2) / feedbacks.length) / 2

  return star
}
export default getAverageStar
