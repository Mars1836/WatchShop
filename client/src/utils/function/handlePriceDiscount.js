function handlePriceDiscount(product) {
  const price = product.price
  const discount = product.discount || 0
  if (!price) {
    return 0
  }
  return Math.floor(price * (1 - discount / 100))
}
export default handlePriceDiscount
