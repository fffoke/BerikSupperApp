import { type ReactNode, useEffect } from 'react'

type Props = {
    isOpen: boolean
    onClose: (value: boolean) => void // Сделаем типизацию функции чище
    children: ReactNode
}

export default function BasicModel({ isOpen, onClose, children }: Props) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose(false)
        }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Нативный бэкдроп (затемнение фона) с размытием */}
            <div
                className="absolute inset-0 bg-black/50 dark:bg-black/75 backdrop-blur-sm transition-opacity"
                onClick={() => onClose(false)}
            />

            {/* Контейнер-невидимка. Он не имеет своих фонов, рамок и паддингов! */}
            <div className="relative z-10 w-full max-w-md transform transition-all">
                {/* Сюда прилетает LoginForm или RegisterForm. 
                  Они сами круглые ([rounded-32px]), белые и с тенями.
                */}
                {children}
            </div>

        </div>
    )
}