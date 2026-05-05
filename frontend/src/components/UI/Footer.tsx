import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer
            className="
        bg-white border border-gray-200  shadow-sm
        dark:bg-gray-800 dark:border-gray-700
      "
        >
            <div
                className="
          w-full max-w-screen-xl mx-auto p-4
          md:flex md:items-center md:justify-between
        "
            >
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    © 2026{" "}
                    <a
                        href="https://flowbite.com/"
                        className="hover:underline"
                    >
                        Flowbite™
                    </a>
                    . All Rights Reserved.
                </span>

                <ul className="flex flex-wrap items-center mt-3 md:mt-0 text-sm font-medium">
                    <li>
                        <a
                            href="#"
                            className="
                text-gray-500 hover:text-gray-900 hover:underline
                dark:text-gray-400 dark:hover:text-white
                me-4 md:me-6
              "
                        >
                            About
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            className="
                text-gray-500 hover:text-gray-900 hover:underline
                dark:text-gray-400 dark:hover:text-white
                me-4 md:me-6
              "
                        >
                            Privacy Policy
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            className="
                text-gray-500 hover:text-gray-900 hover:underline
                dark:text-gray-400 dark:hover:text-white
                me-4 md:me-6
              "
                        >
                            Licensing
                        </a>
                    </li>

                    <li>
                        <Link
                            to="/contact"
                            className="
                text-gray-500 hover:text-gray-900 hover:underline
                dark:text-gray-400 dark:hover:text-white
              "
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}