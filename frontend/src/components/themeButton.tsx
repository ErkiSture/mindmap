export default function ThemeButton() {
    function toggleTheme() {
        const body = document.body;
        if (body.classList.contains('dark')) {
            body.classList.remove('dark');
            body.classList.add("light")
            //localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove("light")
            body.classList.add('dark');
            //localStorage.setItem('theme', 'dark');
        }
    }

    return (
        <button onClick={toggleTheme} className="theme-toggle-button">
            Toggle Theme
        </button>
    );
}