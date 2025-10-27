import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_base")({
  component: BaseLayout,
})

function BaseLayout() {
  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden">
      <main className="flex h-full w-full flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  )
}
