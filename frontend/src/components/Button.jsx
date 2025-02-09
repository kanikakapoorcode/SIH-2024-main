export function Button({label, onClick}) {
    return <button 
    onClick={onClick} type="button" 
    class=" w-full text-white bg-[#0f4b8a] 
    hover:bg-[#00bbf1]
    focus:outline-none focus:ring-4 focus:ring-[#95c6fa] 
    font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
        {label}
    </button>
}