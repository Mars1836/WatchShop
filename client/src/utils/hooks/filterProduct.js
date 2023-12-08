import { useEffect, useState } from "react"
import mt from "../obj/method_filter"
export default function useFilterProducts(
  products = [],
  filters = [],
  limit = 0,
) {
  const [result, setResult] = useState([])
  const [productsFilter, setProductFilter] = useState(products)

  useEffect(() => {
    if (products === null) {
      setResult([])
      return
    }
    let arr = filters.reduce((currProduct, filter) => {
      return currProduct.filter(prd => {
        switch (filter.method) {
          case mt.lt:
            if (filter.value) return prd[filter.key] < filter.value
            return true
          case mt.e:
            if (filter.value) return prd[filter.key] === filter.value
            return true
          case mt.mt:
            if (filter.value) return prd[filter.key] > filter.value
            return true
          case mt.lte:
            if (filter.value) return prd[filter.key] <= filter.value
            return true
          case mt.mte:
            if (filter.value) return prd[filter.key] >= filter.value
            return true
          case mt.exist:
            return prd[filter.key] && prd[filter.value]
          case mt.btw:
            return (
              prd[filter.key] <= filter.value[1] &&
              prd[filter.key] >= filter.value[0]
            )
          case mt.in:
            if (filter.value && typeof filter.value === "string") {
              if (
                prd[filter.key]
                  .toUpperCase()
                  .includes(filter.value.toUpperCase())
              )
                return true
              else return false
            }
            if (filter.value.length) {
              for (let i = 0; i < filter.value.length; i++) {
                if (!prd[filter.key].includes(filter.value[i])) {
                  return false
                }
              }
              return true
            }
            return true
          default:
            return true
        }
      })
    }, products)
    if (limit) setResult(arr.slice(0, limit))
    else setResult(arr)
  }, [products, filters])
  useEffect(() => {}, [result])
  return result
}
