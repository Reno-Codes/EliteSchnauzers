import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { images } from "../assets/images";

const About = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen py-20">
            {/* About Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
                        {t("about.title")}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {t("about.subtitle")}
                    </p>
                </motion.div>

                {/* Our Story */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-display font-bold text-primary mb-4">
                            {t("about.story.title")}
                        </h2>
                        <p className="text-gray-600 mb-4">
                            {t("about.story.part1")}
                        </p>
                        <p className="text-gray-600">
                            {t("about.story.part2")}
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative h-[400px] rounded-lg overflow-hidden"
                    >
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `url(${images.about})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />
                        <div className="absolute inset-0 bg-primary/20"></div>
                    </motion.div>
                </div>

                {/* Our Values */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-display font-bold text-primary mb-12">
                        {t("about.values.title")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Value
                            title={t("about.values.health.title")}
                            description={t("about.values.health.description")}
                        />
                        <Value
                            title={t("about.values.ethical.title")}
                            description={t("about.values.ethical.description")}
                        />
                        <Value
                            title={t("about.values.family.title")}
                            description={t("about.values.family.description")}
                        />
                    </div>
                </motion.div>

                {/* Certifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-display font-bold text-primary mb-8">
                        {t("about.certifications.title")}
                    </h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="font-bold text-primary mb-2">
                                {t("about.certifications.akc.title")}
                            </h3>
                            <p className="text-gray-600">
                                {t("about.certifications.akc.description")}
                            </p>
                        </div>
                        {/* <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="font-bold text-primary mb-2">
                                {t("about.certifications.msca.title")}
                            </h3>
                            <p className="text-gray-600">
                                {t("about.certifications.msca.description")}
                            </p>
                        </div> </div>*/}

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="font-bold text-primary mb-2">
                                {t("about.certifications.health.title")}
                            </h3>
                            <p className="text-gray-600">
                                {t("about.certifications.health.description")}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

const Value = ({
    title,
    description,
}: {
    title: string;
    description: string;
}) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default About;
