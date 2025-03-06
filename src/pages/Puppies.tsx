import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { type Puppy, availablePuppies } from "../data/AvailablePuppies";

const Puppies = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
                        {t("puppies.title")}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {t("puppies.subtitle")}
                    </p>
                </motion.div>

                {/* Puppy Grid or No Puppies Message */}
                {availablePuppies.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {availablePuppies.map((puppy) => (
                            <PuppyCard key={puppy.id} puppy={puppy} />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center bg-white p-12 rounded-lg shadow-md"
                    >
                        <div className="mb-6">
                            <svg
                                className="w-16 h-16 mx-auto text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-display font-bold text-primary mb-4">
                            {t("puppies.noAvailable.title")}
                        </h2>
                        <p className="text-gray-600 mb-6">
                            {t("puppies.noAvailable.message")}
                        </p>
                        <Link
                            to="/contact"
                            className="btn btn-primary inline-block"
                        >
                            {t("puppies.noAvailable.contact")}
                        </Link>
                    </motion.div>
                )}

                {/* Reservation Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center bg-white p-8 rounded-lg shadow-md"
                >
                    <h2 className="text-3xl font-display font-bold text-primary mb-6">
                        {t("puppies.reservation.title")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <Step
                            number={1}
                            title={t("puppies.reservation.steps.contact.title")}
                            description={t(
                                "puppies.reservation.steps.contact.description"
                            )}
                        />
                        <Step
                            number={2}
                            title={t("puppies.reservation.steps.meet.title")}
                            description={t(
                                "puppies.reservation.steps.meet.description"
                            )}
                        />
                        <Step
                            number={3}
                            title={t("puppies.reservation.steps.reserve.title")}
                            description={t(
                                "puppies.reservation.steps.reserve.description"
                            )}
                        />
                    </div>
                    <Link
                        to="/contact"
                        className="btn btn-primary inline-block text-lg"
                    >
                        {t("puppies.reservation.cta")}
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

const PuppyCard = ({ puppy }: { puppy: Puppy }) => {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
        >
            <div
                className="h-64 bg-gray-200"
                style={{
                    backgroundImage: `url(${puppy.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <div className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-2">
                    {puppy.name}
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="text-gray-600">
                            {t("puppies.details.gender")}
                        </p>
                        <p className="font-medium">
                            {t(`puppies.details.${puppy.gender}`)}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-600">
                            {t("puppies.details.color")}
                        </p>
                        <p className="font-medium">
                            {t(`puppies.details.colors.${puppy.color}`)}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-600">
                            {t("puppies.details.age")}
                        </p>
                        <p className="font-medium">
                            {t("puppies.details.weeks", {
                                count: parseInt(puppy.age),
                            })}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-600">
                            {t("puppies.details.price")}
                        </p>
                        <p className="font-medium">{puppy.price}</p>
                    </div>
                </div>
                <Link
                    to={`/contact?puppy=${puppy.name}`}
                    className="btn btn-secondary w-full text-center"
                >
                    {t("puppies.details.inquire", { name: puppy.name })}
                </Link>
            </div>
        </motion.div>
    );
};

const Step = ({
    number,
    title,
    description,
}: {
    number: number;
    title: string;
    description: string;
}) => (
    <div className="text-center">
        <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
            {number}
        </div>
        <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default Puppies;
