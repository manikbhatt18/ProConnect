export default function Loader() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
  