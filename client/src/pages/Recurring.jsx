import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
const Recurring = () => {
    const { darkMode, privateMode } = useContext = { ThemeContext }
    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            <div className={`transition-all duration-300`}>
                <main className="p-6 space-y-6">
                    <div>
                        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Bills & Subscriptions</h1>
                        <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Track and manage your bills & subscriptions</p>
                    </div>
                </main>
            </div>
        </div>
    );
}
export default Recurring;