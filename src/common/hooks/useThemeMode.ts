import { useEffect, useState } from 'react';

export const useThemeMode = () => {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const localTheme = localStorage.getItem('theme');
        localTheme && setTheme(localTheme);
    }, []);

    const setMode = (mode: string) => {
        localStorage.setItem('theme', mode);
        setTheme(mode);
    };

    const themeToggler = () => (theme === 'dark' ? setMode('light') : setMode('dark'));

    return { theme, themeToggler};
};
