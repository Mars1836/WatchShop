import { useEffect, useState } from "react"
let promise = new Promise(function (resolve, reject) {
  resolve("done")
})
function useAsyncData(initRequest = promise) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [request, setRequest] = useState(initRequest)
  useEffect(() => {
    request
      .then(({ data }) => {
        setData(data)
        console.log(data)
        setLoading(false)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }, [request])
  return [data, error, loading, setRequest]
}
export default useAsyncData
