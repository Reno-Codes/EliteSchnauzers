import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <span className="font-display text-2xl font-bold text-primary">
                                Elite Schnauzers
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink to="/">{t("navigation.home")}</NavLink>
                        <NavLink to="/about">{t("navigation.about")}</NavLink>
                        <NavLink to="/gallery">
                            {t("navigation.gallery")}
                        </NavLink>
                        <NavLink to="/puppies">
                            {t("navigation.puppies")}
                        </NavLink>
                        <NavLink to="/contact">
                            {t("navigation.contact")}
                        </NavLink>

                        <LanguageSwitcher />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <LanguageSwitcher />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-primary p-2"
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden overflow-hidden"
                        style={{ pointerEvents: isOpen ? "auto" : "none" }}
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
                            <MobileNavLink
                                to="/"
                                onClick={() => setIsOpen(false)}
                            >
                                {t("navigation.home")}
                            </MobileNavLink>
                            <MobileNavLink
                                to="/about"
                                onClick={() => setIsOpen(false)}
                            >
                                {t("navigation.about")}
                            </MobileNavLink>
                            <MobileNavLink
                                to="/gallery"
                                onClick={() => setIsOpen(false)}
                            >
                                {t("navigation.gallery")}
                            </MobileNavLink>
                            <MobileNavLink
                                to="/puppies"
                                onClick={() => setIsOpen(false)}
                            >
                                {t("navigation.puppies")}
                            </MobileNavLink>
                            <MobileNavLink
                                to="/contact"
                                onClick={() => setIsOpen(false)}
                            >
                                {t("navigation.contact")}
                            </MobileNavLink>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const NavLink = ({
    to,
    children,
}: {
    to: string;
    children: React.ReactNode;
}) => (
    <Link
        to={to}
        className="text-primary hover:text-secondary transition-colors duration-200 font-medium"
    >
        {children}
    </Link>
);

const MobileNavLink = ({
    to,
    onClick,
    children,
}: {
    to: string;
    onClick: () => void;
    children: React.ReactNode;
}) => (
    <Link
        to={to}
        onClick={onClick}
        className="block px-3 py-2 text-primary hover:text-secondary transition-colors duration-200 font-medium"
    >
        {children}
    </Link>
);

export default Navbar;
