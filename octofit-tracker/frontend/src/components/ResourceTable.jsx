import useResource from '../hooks/useResource.js'

export default function ResourceTable({ columns, description, endpoint, fetcher, title }) {
  const { items, loading, error } = useResource(endpoint, fetcher)

  return (
    <section>
      <div className="mb-4">
        <h1 className="h2 mb-1">{title}</h1>
        <p className="text-secondary">{description}</p>
      </div>

      {loading && (
        <div aria-live="polite" className="text-secondary py-4" role="status">
          <span aria-hidden="true" className="spinner-border spinner-border-sm me-2" />
          Loading {title.toLowerCase()}...
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          Could not load {title.toLowerCase()}: {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <p className="alert alert-info">No {title.toLowerCase()} to show yet.</p>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} scope="col">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id || item.id || `${endpoint}-${index}`}>
                  {columns.map((column) => {
                    const value = item[column.key]
                    const content =
                      typeof column.render === 'function'
                        ? column.render(value, item)
                        : value

                    return <td key={column.key}>{content}</td>
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
