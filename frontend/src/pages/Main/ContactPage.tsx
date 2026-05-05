import React from 'react';
import { FiGithub, FiSend, FiMail, FiMapPin, FiExternalLink } from 'react-icons/fi';

// --- КОНФИГУРАЦИЯ ТВОИХ ДАННЫХ ---
const CONTACT_DATA = {
    name: "Berik",
    specialty: "Fullstack Developer",
    github: "https://github.com/fffoke",
    telegram: "https://t.me/Askqqm",
    email: "baktibaiberik@gmail.com",
    location: "Kazakhstan, Karagandy",
};

interface ContactItemProps {
    icon: React.ElementType;
    label: string;
    value: string;
    href: string;
    color: string;
}

const ContactCard: React.FC<ContactItemProps> = ({ icon: Icon, label, value, href, color }) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500/50"
        >
            {/* Фоновый градиент при наведении */}
            <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-10 blur-3xl transition-opacity group-hover:opacity-40 ${color}`}></div>

            <div className="flex items-center space-x-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-xl transition-transform group-hover:scale-110 dark:bg-gray-900/50`}>
                    <Icon className="text-gray-700 dark:text-gray-300 group-hover:text-blue-500" />
                </div>
                <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">{label}</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">{value}</p>
                </div>
                <FiExternalLink className="text-gray-300 transition-colors group-hover:text-blue-500 dark:text-gray-600" />
            </div>
        </a>
    );
};

export const ContactPage: React.FC = () => {
    return (
        <div className="min-h-full bg-gray-50 py-12 px-4 transition-colors duration-300 dark:bg-gray-900 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">

                {/* Header Section */}
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-5xl font-black tracking-tight text-gray-900 dark:text-white md:text-6xl">
                        Let's build <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">something epic.</span>
                    </h1>
                    <p className="mx-auto max-w-xl text-lg text-gray-600 dark:text-gray-400">
                        Есть идея или крутой проект? Я всегда на связи. Выбирай любой удобный способ, и погнали кодить.
                    </p>
                </div>

                {/* Contact Grid */}
                <div className="grid gap-6 md:grid-cols-2">

                    <ContactCard
                        icon={FiSend}
                        label="Telegram"
                        value="@Askqqm"
                        href={CONTACT_DATA.telegram}
                        color="bg-blue-400"
                    />

                    <ContactCard
                        icon={FiGithub}
                        label="GitHub"
                        value="github.com/ffoke"
                        href={CONTACT_DATA.github}
                        color="bg-gray-400"
                    />

                    <ContactCard
                        icon={FiMail}
                        label="Email"
                        value={CONTACT_DATA.email}
                        href={`mailto:${CONTACT_DATA.email}`}
                        color="bg-purple-400"
                    />

                    <ContactCard
                        icon={FiMapPin}
                        label="Location"
                        value={CONTACT_DATA.location}
                        href="#"
                        color="bg-red-400"
                    />
                </div>

                {/* "Derzky" Footer Card */}
                <div className="
                mt-12 overflow-hidden rounded-3xl p-8 shadow-2xl
                bg-white text-gray-900 border border-gray-200
                dark:bg-gray-900 dark:text-white dark:border-gray-800
                ">
                    <div className="relative z-10 flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
                        <div>
                            <h2 className="text-3xl font-bold">Готов к дедлайнам?</h2>
                            <p className="text-gray-400">Жми на кнопку, если твой проект изменит мир.</p>
                        </div>
                        <a
                            href={CONTACT_DATA.telegram}
                            className="group flex items-center space-x-3 rounded-full bg-white px-8 py-4 font-bold text-black transition-all hover:bg-blue-500 hover:text-white"
                        >
                            <span>Написать прямо сейчас</span>
                            <FiSend className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </a>
                    </div>

                    {/* Декоративный элемент фона */}
                    <div className="absolute top-0 left-0 -z-0 h-full w-full opacity-20 [background:radial-gradient(circle_at_50%_120%,#3b82f6,transparent_50%)]"></div>
                </div>

            </div>
        </div>
    );
};

export default ContactPage;