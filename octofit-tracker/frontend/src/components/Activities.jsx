import { fetchCollection as fetch } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

const columns = [
  {
    key: 'user',
    label: 'User',
    render: (user) => user?.name || user?.email || user?._id || user || 'Unknown',
  },
  { key: 'activityType', label: 'Activity' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  { key: 'distanceKm', label: 'Distance (km)' },
  {
    key: 'completedAt',
    label: 'Completed',
    render: (date) => (date ? new Date(date).toLocaleString() : '-'),
  },
]

export default function Activities() {
  return (
    <ResourceTable
      columns={columns}
      description="Recent training sessions logged by the community."
      endpoint="/api/activities/"
      fetcher={fetch}
      title="Activities"
    />
  )
}
