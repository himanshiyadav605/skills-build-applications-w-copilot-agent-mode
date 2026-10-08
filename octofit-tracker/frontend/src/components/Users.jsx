import { fetchCollection as fetch } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'bio', label: 'About' },
]

export default function Users() {
  return (
    <ResourceTable
      columns={columns}
      description="Get to know the people in your fitness community."
      endpoint="/api/users/"
      fetcher={fetch}
      title="Users"
    />
  )
}
