import Form from "./Form"

type Props = {
    isOpen: boolean,
    onClose: React.Dispatch<React.SetStateAction<boolean>>,
    header: string,
    body: string | {
        handleSubmit: (e: React.FormEvent) => void;
        button_text: string;
        InputFields: {
            label: string;
            name: string;
            value?: string; // для file можно не передавать
            type?: React.HTMLInputTypeAttribute;
            placeholder?: string;
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        }[];
    }
}

export default function ModalWindow({ isOpen, onClose, header, body }: Props) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm"
                onClick={() => onClose(false)}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-2xl p-4">
                <div className="
                    bg-white dark:bg-gray-800
                    rounded-lg shadow-lg
                    border border-gray-200 dark:border-gray-700
                ">

                    {/* Header */}
                    <div className="
                        flex items-center justify-between p-4
                        border-b border-gray-200 dark:border-gray-700
                    ">
                        <h3 className="
                            text-lg font-semibold
                            text-gray-900 dark:text-white
                        ">
                            {header}
                        </h3>

                        <button
                            onClick={() => onClose(false)}
                            className="
                                w-8 h-8 flex items-center justify-center rounded-lg
                                text-gray-400 hover:text-gray-900
                                dark:hover:text-white
                                hover:bg-gray-100 dark:hover:bg-gray-700
                                transition
                            "
                        >
                            ✕
                        </button>
                    </div>

                    {/* Body */}
                    <div className="
                        p-4 space-y-4
                        text-gray-600 dark:text-gray-300
                    ">
                        {/* <p>
                            With less than a month to go before the European Union enacts new consumer privacy laws...
                        </p>
                        <p>
                            The European Union’s General Data Protection Regulation...
                        </p> */}
                        {typeof body !== 'string' ? <Form handleSubmit={body.handleSubmit} InputFields={body.InputFields} button_text={body.button_text} /> : (
                            <p>
                                {body}
                            </p>
                        )}
                    </div>

                    {/* Footer */}
                    {typeof body === 'string' && (
                        <div className="
                        flex justify-end gap-3 p-4
                        border-t border-gray-200 dark:border-gray-700
                    ">
                            <button
                                onClick={() => onClose(false)}
                                className="
                                px-4 py-2 rounded-lg text-sm font-medium
                                bg-gray-200 text-gray-800
                                hover:bg-gray-300
                                dark:bg-gray-700 dark:text-gray-200
                                dark:hover:bg-gray-600
                                transition
                            "
                            >
                                Decline
                            </button>

                            <button
                                onClick={() => onClose(false)}
                                className="
                                px-4 py-2 rounded-lg text-sm font-medium
                                text-white
                                bg-blue-600 hover:bg-blue-700
                                dark:bg-blue-500 dark:hover:bg-blue-600
                                transition
                            "
                            >
                                I accept
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}