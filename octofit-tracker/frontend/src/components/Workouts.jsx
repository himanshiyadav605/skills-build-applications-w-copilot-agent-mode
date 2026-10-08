import { fetchCollection as fetch } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

const columns = [
  { key: 'title', label: 'Workout' },
  { key: 'description', label: 'About' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  {
    key: 'exercises',
    label: 'Exercises',
    render: (exercises) => (Array.isArray(exercises) ? exercises.join(', ') : '-'),
  },
]

export default function Workouts() {
  return (
    <ResourceTable
      columns={columns}
      description="Find a guided session that fits your training goals."
      endpoint="/api/workouts/"
      fetcher={fetch}
      title="Workouts"
    />
  )
}
