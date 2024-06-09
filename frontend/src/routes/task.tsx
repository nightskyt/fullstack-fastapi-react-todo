import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/task')({
  component: Task,
})

function Task() {
  return (
    <div className="p-2">
      <h3>
        Task Page
      </h3>
    </div>
  )
}