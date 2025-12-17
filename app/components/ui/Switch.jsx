export function Switch({ checked, onCheckedChange, className = "" }) {
    return (
      <button
        onClick={() => onCheckedChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#34D2A2] focus:ring-offset-2 ${
          checked ? "bg-[#0A3E49]" : "bg-gray-300"
        } ${className}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    );
  }