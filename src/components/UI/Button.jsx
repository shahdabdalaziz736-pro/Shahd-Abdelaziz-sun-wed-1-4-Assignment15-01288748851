export default function Button({ children, className, loading, ...props }) {
  return (
    <button
      disabled={loading}
      className={`w-full bg-[#002f95] text-white py-2.5 rounded-lg font-bold 
      hover:bg-blue-800 active:scale-[0.98] transition-all duration-200 
      disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center gap-2 ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}