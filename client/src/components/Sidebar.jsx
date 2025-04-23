// Sidebar.jsx
import {
    DocumentTextIcon,
    ChartBarIcon,
    ClockIcon,
    ArrowLeftOnRectangleIcon,
    ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

import { useEffect, useState } from 'react';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        if (sidebarOpen) {
            const timeout = setTimeout(() => setShowText(true), 700);
            return () => clearTimeout(timeout);
        } else {
            setShowText(false);
        }
    }, [sidebarOpen]);

    return (
        <aside
            className={`${sidebarOpen ? 'w-48' : 'w-16'
                } bg-white dark:bg-gray-800 shadow-md hidden md:flex flex-col justify-between transition-all duration-500 ease-in-out overflow-hidden`}
        >
            <div>
                <div
                    className={`p-4 text-center transition-all duration-500 ease-in-out ${sidebarOpen ? 'text-3xl' : 'text-2xl'
                        }`}
                >
                    <span>{sidebarOpen ? 'ᶠᶸᶜᵏᵧₒᵤ!🖕' : '🖕'}</span>
                </div>

                <nav
                    className={`flex flex-col ${sidebarOpen ? 'space-y-4 px-4' : 'items-center space-y-6 py-2'
                        } transition-all duration-500 ease-in-out`}
                >
                    <a
                        href="/todos"
                        className={`flex items-center ${sidebarOpen ? 'justify-start gap-3' : 'justify-center'
                            } transition-all duration-300`}
                    >
                        <DocumentTextIcon className="h-5 w-5" />
                        {sidebarOpen && (
                            <span
                                className={`transition-opacity duration-1000 ${showText ? 'opacity-100' : 'opacity-0'
                                    }`}
                            >
                                To-Do
                            </span>
                        )}
                    </a>
                    <a
                        href="/habits"
                        className={`flex items-center ${sidebarOpen ? 'justify-start gap-3' : 'justify-center'
                            } transition-all duration-300`}
                    >
                        <ChartBarIcon className="h-5 w-5" />
                        {sidebarOpen && (
                            <span
                                className={`transition-opacity duration-1000 ${showText ? 'opacity-100' : 'opacity-0'
                                    }`}
                            >
                                Habit Tracker
                            </span>
                        )}
                    </a>
                    <a
                        href="/pomodoro"
                        className={`flex items-center ${sidebarOpen ? 'justify-start gap-3' : 'justify-center'
                            } transition-all duration-300`}
                    >
                        <ClockIcon className="h-5 w-5" />
                        {sidebarOpen && (
                            <span
                                className={`transition-opacity duration-1000 ${showText ? 'opacity-100' : 'opacity-0'
                                    }`}
                            >
                                Pomodoro
                            </span>
                        )}
                    </a>
                </nav>
            </div>

            <div className="p-4">
                <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {sidebarOpen ? (
                        <ArrowLeftOnRectangleIcon className="h-6 w-6 text-gray-700 dark:text-white transition-transform duration-300 hover:scale-110" />
                    ) : (
                        <ArrowRightOnRectangleIcon className="h-6 w-6 text-gray-700 dark:text-white transition-transform duration-300 hover:scale-110" />
                    )}
                </button>
            </div>
        </aside>
    );
}