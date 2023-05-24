
import { Link} from "react-router-dom";


const Navbar = () => {
  
    return (
        <div>
            <header className="text-gray-600 body-font shadow-lg">
                <div className="container flex p-4 flex-col md:flex-row items-center justify-between">
                    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                        <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                            <span className="ml-3 text-xl">Home</span>
                        </Link>
                        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                            <Link to="/register" className="mr-5 hover:text-gray-900">Register</Link>

                        </nav>
                        

                    </div>
        

                </div>
            </header>
        </div>
    );
};

export default Navbar;