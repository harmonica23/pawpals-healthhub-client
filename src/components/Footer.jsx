

const Footer = () => {
    const currentYear = new Date().getFullYear()
    return (
        <div>
            <footer>
                <p>&copy; {currentYear} PawPals Health Hub</p>
            </footer>
        </div>
    )
}
export default Footer