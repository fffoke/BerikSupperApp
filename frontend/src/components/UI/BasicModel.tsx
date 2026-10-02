import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';

type Props = {
    isOpen: boolean;
    onClose: (value: boolean) => void;
    children: ReactNode;
};

export default function BasicModel({ isOpen, onClose, children }: Props) {
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;
        const previousFocus = document.activeElement as HTMLElement | null;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        dialogRef.current?.querySelector<HTMLElement>('input')?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose(false);
            if (event.key !== 'Tab') return;
            const controls = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), a[href]');
            if (!controls?.length) return;
            const first = controls[0];
            const last = controls[controls.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = previousOverflow;
            previousFocus?.focus();
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/55 p-4 backdrop-blur-sm">
            <button type="button" aria-label="Закрыть окно" className="absolute inset-0 cursor-default" onClick={() => onClose(false)} />
            <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="auth-title" className="relative z-10 my-auto w-full max-w-[440px] overflow-hidden rounded-[30px] bg-white shadow-2xl shadow-slate-950/20">
                <button type="button" aria-label="Закрыть" onClick={() => onClose(false)} className="absolute right-5 top-5 z-20 rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900">
                    <X size={18} />
                </button>
                {children}
            </div>
        </div>
    );
}
