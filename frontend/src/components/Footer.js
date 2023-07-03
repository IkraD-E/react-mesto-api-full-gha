const thisYear = new Date().getFullYear();

export default function Footer() {
    return (
        <footer className="footer">
          <p className="footer__copyright">© {thisYear} Mesto Russia IkraD</p>
        </footer>
    )
}