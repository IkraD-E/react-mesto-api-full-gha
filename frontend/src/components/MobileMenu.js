export default function MobileMenu({loggedIn, email, handleSignOut, isHeaderMobileMenuOpen}) {
    if (loggedIn && isHeaderMobileMenuOpen) {
        return (
            <div className='mobile-menu'>
                <p className='mobile-menu__email'>{email}</p>
                <p className='mobile-menu__link-out' onClick={handleSignOut}>Выйти</p>
            </div>
        )
    }
}