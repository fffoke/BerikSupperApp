import type { InputFields } from "../../type/inputfields";


type Props = {
    handleSubmit: (e: React.FormEvent) => void;
    button_text: string;
    InputFields: InputFields[]
};



export default function Form({ handleSubmit, button_text, InputFields }: Props) {

    if (!InputFields || InputFields.length === 0) {
        return (
            <div className="text-sm text-gray-400 dark:text-gray-500">
                Тут ничего нет
            </div>
        )
    }


    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            className="max-w-sm mx-auto space-y-4"
        >
            {InputFields.map((field) => (
                <div key={field.name}>
                    <label
                        htmlFor={field.name}
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        {field.label}
                    </label>

                    <input
                        id={field.name}
                        name={field.name}
                        type={field.type || "text"}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={field.placeholder}
                        className="
                            w-full px-3 py-2 text-sm rounded-lg border
                            bg-gray-50 border-gray-300 text-gray-900
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                            dark:bg-gray-700 dark:border-gray-600 dark:text-white
                            dark:placeholder-gray-400
                        "
                    />
                </div>
            ))}

            {/* Кнопка */}
            <button
                type="submit"
                className="
                    w-full py-2 rounded-lg text-sm font-medium
                    bg-blue-600 text-white hover:bg-blue-700
                    transition
                "
            >
                {button_text}
            </button>
        </form>
    )
}