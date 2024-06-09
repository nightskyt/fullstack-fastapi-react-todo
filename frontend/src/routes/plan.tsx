import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/plan')({
  component: Plan,
})

function Plan() {
  return (
    <div className="p-2">
      <h3>
        Plan Page
      </h3>
    </div>
  )
}