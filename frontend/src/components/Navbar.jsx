import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaXmark, FaBars, FaUserCircle, FaSignOutAlt, FaSearch } from "react-icons/fa";
import { LiaUniversitySolid } from "react-icons/lia";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [userType, setUserType] = useState(''); // 'inspector', 'university', or ''
    const location = useLocation();
    
    // Determine user type based on URL
    useEffect(() => {
        if (location.pathname.includes('/inspector')) {
            setUserType('inspector');
        } else if (location.pathname.includes('/university')) {
            setUserType('university');
        } else {
            setUserType('');
        }
    }, [location]);

    // Toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Handle scroll for sticky navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Navigation items based on user type
    const getNavItems = () => {
        if (userType === 'inspector') {
            return [
                { link: "Dashboard", path: "/inspector" },
                { link: "Inspect", path: "/inspector/inspect" },
                { link: "Insights", path: "/inspector/insights" },
                { link: "Universities", path: "/inspector/inshome" },
            ];
        } else if (userType === 'university') {
            return [
                { link: "Dashboard", path: "/university" },
                { link: "Reports", path: "/university/reports" },
                { link: "Profile", path: "/university/profile" },
            ];
        } else {
            return [
                { link: "Home", path: "/" },
                { link: "Sign In", path: "/signin" },
                { link: "Sign Up", path: "/signup" },
            ];
        }
    };

    const navItems = getNavItems();

    return (
        <header className={`w-full z-50 transition-all duration-300 ${isSticky ? "sticky top-0 left-0 right-0" : "absolute"}`}>
            <nav className={`px-4 md:px-8 lg:px-24 py-4 transition-all duration-300 ${
                isSticky 
                    ? "bg-white/95 backdrop-blur-sm shadow-md" 
                    : userType 
                        ? "bg-white/80 backdrop-blur-sm" 
                        : "bg-transparent"
            }`}>
                <div className='flex justify-between items-center'>
                    {/* Logo */}
                    <Link to="/" className='flex items-center gap-2 group'>
                        <LiaUniversitySolid className={`w-10 h-10 transition-all ${
                            isSticky || userType ? "text-indigo-600" : "text-white"
                        } group-hover:text-indigo-500`} />
                        <span className={`text-xl font-bold tracking-tight transition-colors ${
                            isSticky || userType ? "text-gray-800" : "text-white"
                        } group-hover:text-indigo-600`}>
                            U.I.W.A
                        </span>
                    </Link>

                    {/* Search bar - only visible when logged in */}
                    {userType && (
                        <div className="hidden md:flex relative mx-4 flex-1 max-w-md">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <FaSearch className="w-4 h-4 text-gray-500" />
                            </div>
                            <input
                                type="search"
                                className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
                                placeholder="Search..."
                            />
                        </div>
                    )}

                    {/* Desktop Nav Items */}
                    <div className='hidden md:flex items-center space-x-1'>
                        <ul className='flex space-x-1'>
                            {navItems.map(({ link, path }) => (
                                <li key={path}>
                                    <Link
                                        to={path}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-indigo-50 ${
                                            location.pathname === path
                                                ? "text-indigo-600 bg-indigo-50"
                                                : isSticky || userType
                                                    ? "text-gray-700 hover:text-indigo-600"
                                                    : "text-white hover:text-indigo-600"
                                        }`}
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* User avatar if logged in */}
                        {userType && (
                            <div className="relative ml-4 group">
                                <button className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-all">
                                    <FaUserCircle className="h-6 w-6" />
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right">
                                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                                        Profile
                                    </Link>
                                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                                        Settings
                                    </Link>
                                    <div className="border-t border-gray-100 my-1"></div>
                                    <Link to="/signout" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                                        <FaSignOutAlt className="mr-2 h-4 w-4" /> Sign out
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className='md:hidden'>
                        <button
                            onClick={toggleMenu}
                            className={`p-2 rounded-lg focus:outline-none ${
                                isSticky || userType 
                                    ? "text-gray-700 hover:bg-gray-100" 
                                    : "text-white hover:bg-white/20"
                            }`}
                        >
                            {isMenuOpen ? (
                                <FaXmark className="h-6 w-6" />
                            ) : (
                                <FaBars className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`fixed inset-0 z-50 bg-gray-800/50 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
                        isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                    onClick={toggleMenu}
                >
                    <div
                        className={`absolute right-0 top-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
                            isMenuOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-lg font-bold text-gray-800">Menu</h2>
                            <button
                                onClick={toggleMenu}
                                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none"
                            >
                                <FaXmark className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="py-2">
                            {userType && (
                                <div className="px-4 py-3 border-b">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                                <FaUserCircle className="h-6 w-6 text-indigo-600" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                User Name
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                {userType === 'inspector' ? 'Inspector' : 'University Official'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {navItems.map(({ link, path }) => (
                                    <Link
                                        key={path}
                                        to={path}
                                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                                            location.pathname === path
                                                ? "text-indigo-600 bg-indigo-50"
                                                : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                                        }`}
                                        onClick={toggleMenu}
                                    >
                                        {link}
                                    </Link>
                                ))}

                                {userType && (
                                    <>
                                        <div className="border-t border-gray-200 my-2"></div>
                                        <Link
                                            to="/settings"
                                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                                            onClick={toggleMenu}
                                        >
                                            Settings
                                        </Link>
                                        <Link
                                            to="/signout"
                                            className="block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                                            onClick={toggleMenu}
                                        >
                                            Sign out
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;