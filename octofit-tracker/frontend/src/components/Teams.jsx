import { fetchCollection as fetch } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'description', label: 'About' },
  {
    key: 'members',
    label: 'Members',
    render: (members) => (Array.isArray(members) ? members.length : 0),
  },
]

export default function Teams() {
  return (
    <ResourceTable
      columns={columns}
      description="Meet the teams building healthy habits together."
      endpoint="/api/teams/"
      fetcher={fetch}
      title="Teams"
    />
  )
}
