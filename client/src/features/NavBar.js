import { Link } from "react-router-dom";
import icon from "../assets/icon.png"

export default function NavBar() {
    const navLinkStyle = "text-xl text-zinc-800 hover:text-zinc-400"

    return (
        <nav className="flex justify-center space-x-32 py-6 border-b-2 border-black">
            <img src={icon} alt="logo" className="w-20 h-20" />
            <Link to="/" className={navLinkStyle + " ml-12"}>Home</Link>
            <Link to="/one" className={navLinkStyle}>Feature One</Link>
            <Link to="/two" className={navLinkStyle}>Feature Two</Link>
        </nav>
    )
}