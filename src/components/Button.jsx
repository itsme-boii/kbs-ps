const Button = ({ children, onClick }) => {
    return (
        <button onClick={onClick} className="bg-white text-black m-2 p-2 rounded rounded-md font-semibold">{children}</button>
    );
    }
export default Button;


