import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import { useSearchParams } from "react-router-dom";
import { availablePuppies } from "../data/AvailablePuppies";

const Contact = () => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const selectedPuppyFromUrl = searchParams.get("puppy");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        preferredPuppy: selectedPuppyFromUrl || "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Update preferred puppy when URL parameter changes
    useEffect(() => {
        if (selectedPuppyFromUrl) {
            setFormData((prev) => ({
                ...prev,
                preferredPuppy: selectedPuppyFromUrl,
            }));
        }
    }, [selectedPuppyFromUrl]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Handle form submission here
        try {
            const formattedMessage = `
        Ime: ${formData.name}
        Email: ${formData.email}
        Telefon: ${formData.phone}
        ${
            availablePuppies.length > 0
                ? `Željeni pas: ${
                      formData.preferredPuppy === ""
                          ? "Općenito"
                          : formData.preferredPuppy
                  }`
                : ""
        }
        Poruka:
        ${formData.message}
      `;

            const templateParams = {
                message: formattedMessage,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
            };

            await emailjs.send(
                "service_tjhv8q1",
                "template_tmwhmt6",
                templateParams,
                "plvSwMnwrtz7r7WIC"
            );
            console.log("Email sent successfully");

            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
                preferredPuppy: "",
            });
            alert("Email sent successfully!");
            setIsSubmitting(false);
        } catch (error) {
            console.error("Error sending email:", error);
            alert("Error sending email:" + error);
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

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
                        {t("contact.title")}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {t("contact.subtitle")}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white p-8 rounded-lg shadow-md"
                        >
                            <div className="mb-6">
                                <label
                                    htmlFor="name"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    {t("contact.form.name")}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="email"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    {t("contact.form.email")}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="phone"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    {t("contact.form.phone")}
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>

                            {availablePuppies.length > 0 && (
                                <div className="mb-6">
                                    <label
                                        htmlFor="preferredPuppy"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        {t("contact.form.preferredPuppy")}
                                    </label>
                                    <select
                                        id="preferredPuppy"
                                        name="preferredPuppy"
                                        value={formData.preferredPuppy}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="">
                                            {t("contact.form.selectPuppy")}
                                        </option>
                                        {availablePuppies.map((puppy) => (
                                            <option
                                                key={puppy.id}
                                                value={puppy.name}
                                            >
                                                {puppy.name} (
                                                {t(
                                                    `puppies.details.${puppy.gender}`
                                                )}
                                                ,{" "}
                                                {t(
                                                    `puppies.details.colors.${puppy.color}`
                                                )}
                                                )
                                            </option>
                                        ))}
                                        <option value="no-preference">
                                            {t("contact.form.noPreference")}
                                        </option>
                                    </select>
                                </div>
                            )}

                            <div className="mb-6">
                                <label
                                    htmlFor="message"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    {t("contact.form.message")}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full btn btn-primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? "Sending..."
                                    : t("contact.form.submit")}
                            </button>
                        </form>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h2 className="text-2xl font-display font-bold text-primary mb-6">
                                {t("contact.info.title")}
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-bold text-gray-700 mb-1">
                                        {t("contact.info.address")}
                                    </h3>

                                    <p className="text-gray-600">
                                        Đakovo, Croatia
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-700 mb-1">
                                        {t("contact.info.phone")}
                                    </h3>
                                    <p className="text-gray-600">
                                        <a
                                            className="hover:text-orange-500"
                                            href="tel:+38598897330"
                                        >
                                            +385 98 897 330
                                        </a>
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-700 mb-1">
                                        {t("contact.info.email")}
                                    </h3>
                                    <p>
                                        <a
                                            className="hover:text-orange-500"
                                            href="mailto:palma.dj@gmail.com"
                                        >
                                            palma.dj@gmail.com
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h2 className="text-2xl font-display font-bold text-primary mb-6">
                                {t("contact.hours.title")}
                            </h2>
                            <div className="space-y-2">
                                <p className="text-gray-600">
                                    <span className="font-bold">
                                        {t("contact.hours.weekdays")}:
                                    </span>{" "}
                                    9:00 - 20:00
                                </p>

                                <p className="text-gray-600">
                                    <span className="font-bold">
                                        {t("contact.hours.sunday")}:
                                    </span>{" "}
                                    {t("contact.hours.byAppointment")}
                                </p>
                            </div>
                            <p className="mt-4 text-gray-600">
                                {t("contact.hours.note")}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
