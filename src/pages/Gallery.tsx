import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

interface Image {
    src: string;
    alt: string;
    cacheKey?: string;
}

const Gallery = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<"adults" | "puppies">("adults");
    const [images, setImages] = useState<{ adults: Image[]; puppies: Image[] }>(
        {
            adults: [],
            puppies: [],
        }
    );
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Function to add cache version to URL
    const getVersionedUrl = (url: string) => {
        const versionedUrl = new URL(url, window.location.origin);
        versionedUrl.searchParams.set("v", "1"); // Cache version
        return versionedUrl.toString();
    };

    // Load images
    const loadImages = useCallback(async () => {
        setIsLoading(true);
        try {
            const adultImages = import.meta.glob(
                "/src/assets/gallery/adults/*"
            );
            const puppyImages = import.meta.glob(
                "/src/assets/gallery/puppies/*"
            );

            const loadedAdults: Image[] = [];
            const loadedPuppies: Image[] = [];

            // Load adult dog images
            for (const path in adultImages) {
                const fileName = path.split("/").pop() || "";
                const name = fileName.split(".")[0];
                const module: any = await adultImages[path]();
                const versionedSrc = getVersionedUrl(module.default);
                loadedAdults.push({
                    src: versionedSrc,
                    alt: name,
                    cacheKey: `adult-${name}-v1`,
                });
            }

            // Load puppy images
            for (const path in puppyImages) {
                const fileName = path.split("/").pop() || "";
                const name = fileName.split(".")[0];
                const module: any = await puppyImages[path]();
                const versionedSrc = getVersionedUrl(module.default);
                loadedPuppies.push({
                    src: versionedSrc,
                    alt: name,
                    cacheKey: `puppy-${name}-v1`,
                });
            }

            setImages({
                adults: loadedAdults,
                puppies: loadedPuppies,
            });
        } catch (error) {
            console.error("Error loading images:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadImages();
    }, [loadImages]);

    // Preload all images immediately
    useEffect(() => {
        const allImages = [...images.adults, ...images.puppies];
        allImages.forEach((image) => {
            const img = new Image();
            img.src = image.src;
        });
    }, [images]);

    return (
        <div className="min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
                        {t("gallery.title")}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {t("gallery.subtitle")}
                    </p>
                </motion.div>

                {/* Tabs */}
                <div className="flex justify-center space-x-4 mb-8">
                    <button
                        onClick={() => setActiveTab("adults")}
                        className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                            activeTab === "adults"
                                ? "bg-primary text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        {t("gallery.tabs.adults")}
                    </button>
                    <button
                        onClick={() => setActiveTab("puppies")}
                        className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                            activeTab === "puppies"
                                ? "bg-primary text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        {t("gallery.tabs.puppies")}
                    </button>
                </div>

                {/* Image Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    <AnimatePresence mode="wait">
                        {isLoading
                            ? // Loading placeholders
                              Array.from({ length: 8 }).map((_, index) => (
                                  <motion.div
                                      key={`placeholder-${index}`}
                                      initial={{ opacity: 0.5 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                      className="aspect-square bg-gray-200 rounded-lg animate-pulse"
                                  />
                              ))
                            : images[activeTab].map((image, index) => (
                                  <motion.div
                                      key={image.src}
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.9 }}
                                      transition={{
                                          duration: 0.3,
                                          delay: index * 0.1,
                                      }}
                                      className="aspect-square relative rounded-lg overflow-hidden cursor-pointer group"
                                      onClick={() => setSelectedImage(image)}
                                  >
                                      <img
                                          src={image.src}
                                          alt={image.alt}
                                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                          style={{ backgroundColor: "#f3f4f6" }}
                                      />
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                          <span className="text-white text-lg font-medium">
                                              View Larger
                                          </span>
                                      </div>
                                  </motion.div>
                              ))}
                    </AnimatePresence>
                </motion.div>

                {/* Lightbox */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                            onClick={() => setSelectedImage(null)}
                        >
                            <motion.img
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.9 }}
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                className="max-w-full max-h-[90vh] object-contain"
                            />
                            <button
                                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImage(null);
                                }}
                            >
                                <svg
                                    className="w-8 h-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Gallery;
