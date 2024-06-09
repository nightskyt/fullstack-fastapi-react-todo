import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/important')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <h3>Imporant Page</h3>
    </div>
  )
}
