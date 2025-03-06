import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const languages = [
    { code: "hr", label: "Croatian" },
    { code: "en", label: "English" },
];

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const getCurrentLanguage = () => {
        return (
            languages.find((lang) => lang.code === i18n.language) ||
            languages[0]
        );
    };

    const handleLanguageChange = (langCode: string) => {
        i18n.changeLanguage(langCode);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 transition-colors duration-200"
            >
                <span>{getCurrentLanguage().label}</span>
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                        {languages.map((language) => (
                            <button
                                key={language.code}
                                onClick={() =>
                                    handleLanguageChange(language.code)
                                }
                                className={`${
                                    i18n.language === language.code
                                        ? "bg-primary/10 text-primary"
                                        : "text-gray-700 hover:bg-gray-100"
                                } group flex w-full items-center px-4 py-2 text-sm transition-colors duration-200`}
                            >
                                <span className="flex-grow text-left">
                                    {language.label}
                                </span>
                                {i18n.language === language.code && (
                                    <svg
                                        className="w-4 h-4 text-primary"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
