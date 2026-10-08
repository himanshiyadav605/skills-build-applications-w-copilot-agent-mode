import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function useResource(endpoint) {
  const [resource, setResource] = useState(() => ({
    endpoint,
    items: [],
    loading: true,
    error: '',
  }))

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(endpoint, controller.signal)
      .then((items) => {
        if (!controller.signal.aborted) {
          setResource({ endpoint, items, loading: false, error: '' })
        }
      })
      .catch((requestError) => {
        if (!controller.signal.aborted && requestError.name !== 'AbortError') {
          setResource({
            endpoint,
            items: [],
            loading: false,
            error: requestError.message,
          })
        }
      })

    return () => controller.abort()
  }, [endpoint])

  return {
    items: resource.items,
    loading: resource.endpoint !== endpoint || resource.loading,
    error: resource.endpoint === endpoint ? resource.error : '',
  }
}
