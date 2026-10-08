import { fetchCollection as fetch } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

const columns = [
  {
    key: 'user',
    label: 'User',
    render: (user) => user?.name || user?.email || user?._id || user || 'Unknown',
  },
  {
    key: 'team',
    label: 'Team',
    render: (team) => team?.name || team?._id || team || '-',
  },
  { key: 'score', label: 'Score' },
  { key: 'period', label: 'Period' },
]

export default function Leaderboard() {
  return (
    <ResourceTable
      columns={columns}
      description="See how individual and team efforts rank."
      endpoint="/api/leaderboard/"
      fetcher={fetch}
      title="Leaderboard"
    />
  )
}
