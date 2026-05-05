
export type InputFields = {
    label: string;
    name: string;
    value?: string; // для file можно не передавать
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}