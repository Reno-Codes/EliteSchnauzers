import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { images } from "../assets/images";

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[80vh] bg-gradient-to-r from-primary to-accent overflow-hidden">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(${images.hero})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center text-white z-10"
                >
                    <div className="text-center max-w-4xl mx-auto px-4">
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                            {t("home.hero.title")}
                        </h1>
                        <p className="text-xl md:text-2xl mb-8">
                            {t("home.hero.subtitle")}
                        </p>
                        <Link
                            to="/puppies"
                            className="btn btn-secondary inline-block text-lg"
                        >
                            {t("home.hero.cta")}
                        </Link>
                    </div>
                </motion.div>
                <div className="absolute inset-0 bg-black/40 z-[5]"></div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-neutral">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-display font-bold text-primary mb-4">
                            {t("home.features.title")}
                        </h2>
                        <p className="text-lg text-gray-600">
                            {t("home.features.subtitle")}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Feature
                            title={t("home.features.health.title")}
                            description={t("home.features.health.description")}
                            icon={
                                <svg
                                    className="h-12 w-12"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            }
                        />
                        <Feature
                            title={t("home.features.bloodlines.title")}
                            description={t(
                                "home.features.bloodlines.description"
                            )}
                            icon={
                                <svg
                                    className="h-12 w-12"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                    />
                                </svg>
                            }
                        />
                        <Feature
                            title={t("home.features.support.title")}
                            description={t("home.features.support.description")}
                            icon={
                                <svg
                                    className="h-12 w-12"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            }
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-display font-bold mb-8">
                            {t("home.cta.title")}
                        </h2>
                        <Link
                            to="/contact"
                            className="btn bg-white text-primary hover:bg-opacity-90 inline-block text-lg"
                        >
                            {t("home.cta.button")}
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

const Feature = ({
    title,
    description,
    icon,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-center p-6 bg-white rounded-lg shadow-md"
    >
        <div className="text-primary mb-4 inline-block">{icon}</div>
        <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </motion.div>
);

export default Home;
