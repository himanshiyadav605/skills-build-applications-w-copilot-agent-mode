import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function useResource(endpoint, fetcher = fetchCollection) {
  const [resource, setResource] = useState(() => ({
    endpoint,
    items: [],
    loading: true,
    error: '',
  }))

  useEffect(() => {
    const controller = new AbortController()

    Promise.resolve()
      .then(() => {
        if (controller.signal.aborted) {
          return
        }

        return fetcher(endpoint, controller.signal)
      })
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
  }, [endpoint, fetcher])

  return {
    items: resource.items,
    loading: resource.endpoint !== endpoint || resource.loading,
    error: resource.endpoint === endpoint ? resource.error : '',
  }
}
