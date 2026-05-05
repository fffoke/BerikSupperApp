type Props = {
  theme: "light" | "dark";
  toggle: () => void;
};

export default function ThemeToggle({ theme, toggle }: Props) {
  return (
    <label className="inline-flex items-center cursor-pointer group">

      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggle}
        className="sr-only peer"
      />

      <div
        className="
          relative w-10 h-5 rounded-full transition
          bg-gray-200
          dark:bg-gray-600
          peer-checked:bg-blue-600

          after:content-['']
          after:absolute after:top-[2px] after:left-[2px]
          after:bg-white after:border after:border-gray-300
          after:rounded-full after:h-4 after:w-4
          after:transition-all

          peer-checked:after:translate-x-5
        "
      ></div>

      <span className="ml-3 text-sm text-gray-600 dark:text-gray-300">
        {theme === "dark" ? "Тёмная" : "Светлая"}
      </span>

    </label>
  );
}