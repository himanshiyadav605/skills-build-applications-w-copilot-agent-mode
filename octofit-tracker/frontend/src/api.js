const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const safeCodespaceName =
  codespaceName && /^[a-z0-9-]+$/i.test(codespaceName) ? codespaceName : null

export const apiBaseUrl = safeCodespaceName
  ? `https://${safeCodespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function extractItems(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    for (const key of ['results', 'items', 'data']) {
      const value = payload[key]
      if (Array.isArray(value)) {
        return value
      }
      if (value && typeof value === 'object') {
        const nestedItems = extractItems(value)
        if (nestedItems) {
          return nestedItems
        }
      }
    }
  }

  return null
}

export async function fetchCollection(endpoint, signal) {
  const response = await fetch(`${apiBaseUrl}${endpoint}`, { signal })
  const payload = await response.json()

  if (!response.ok) {
    const detail =
      payload && typeof payload === 'object'
        ? payload.error || payload.detail || payload.message
        : null
    throw new Error(detail || `Request failed with status ${response.status}`)
  }

  const items = extractItems(payload)
  if (!items) {
    throw new Error('The API returned an unexpected collection response.')
  }

  return items
}
