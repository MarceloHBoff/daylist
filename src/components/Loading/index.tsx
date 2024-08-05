export default function Loading() {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
      <div className="h-44 w-44 animate-spin rounded-full border-b-4 border-blue-400"></div>
    </div>
  )
}
