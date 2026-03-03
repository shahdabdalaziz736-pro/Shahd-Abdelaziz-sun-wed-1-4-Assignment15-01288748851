export default function Input({ icon: Icon, register, name, error, ...props }) {
  return (
    <div className="mb-4 w-full text-left">
      <div className="relative group">
        {Icon && (
          <Icon 
            className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
              error ? 'text-red-500' : 'text-gray-400 group-focus-within:text-[#002f95]'
            }`} 
            size={18} 
          />
        )}
        <input
          {...(register ? register(name) : {})}
          {...props}
          className={`w-full p-3 ${Icon ? 'pl-10' : 'pl-3'} border-2 transition-all duration-200 rounded-lg outline-none
          ${error 
            ? 'border-red-500 focus:border-red-600' 
            : 'border-gray-100 focus:border-[#002f95] bg-gray-50 focus:bg-white shadow-sm'
          }`}
        />
      </div>
      {error && (
        <p className="text-red-500 text-[11px] font-semibold mt-1 ml-1 animate-pulse">
          {error.message}
        </p>
      )}
    </div>
  );
}