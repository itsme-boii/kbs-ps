const Input = ({ type, placeholder, value, onChange }) => {
    return (
        <div className="max-w-lg">
            <div className="flex">
                <div className="relative flex-1">
                    <input type={type} id="hs-strong-password-with-indicator-and-hint-in-popover" className="m-2 py-3 px-4 block w-100 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder={placeholder} onChange={onChange} value={value} style={{"width":"300px"}}/>
                </div>
            </div>
        </div>
    );
}


export default Input;


