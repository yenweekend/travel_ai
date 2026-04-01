import { FeatureSideBar } from '@/components/features/feature-sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="flex">
        <div className="hidden lg:block">
          <FeatureSideBar />
        </div>
        <main className="bg-muted/30 flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </>
  )
}
