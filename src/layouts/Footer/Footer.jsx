import './Footer.scss'
import Socials from "@/components/Socials";

const Footer = () => {
    const menuItems = [
        {
            title: 'Home',
            links: ['Categories', 'Devices', 'Pricing', 'FAQ'],
        },
        {
            title: 'Movies',
            links: ['Gernes', 'Trending', 'New Release', 'Popular'],
        },
        {
            title: 'Shows',
            links: ['Gernes', 'Trending', 'New Release', 'Popular'],
        },
        {
            title: 'Support',
            links: ['Contact Us'],
        },
        {
            title: 'Subscription',
            links: ['Plans', 'Features'],
        },
        {
            title: 'Connect With Us',
            socialLinks: [
                {
                    label: 'Facebook',
                    iconName: 'facebook',
                },
                {
                    label: 'Twitter',
                    iconName: 'twitter',
                },
                {
                    label: 'LinkedIn',
                    iconName: 'linked-in',
                },
            ]
        },
    ]

    const extraLinks = ['Terms of Use', 'Privacy Policy', 'Cookie Policy']

    return (
        <footer className="footer">
            <div className="footer__inner container">
                <nav className="footer__menu">
                    {menuItems.map(( { title, links, socialLinks }, index) => (
                        <div className="footer__menu-column" key={index}>
                            <a className="footer__menu-title h6" href="/">{title}</a>
                            {links?.length > 0 && (
                                <ul className="footer__menu-list">
                                    {links.map((link, index) => (
                                        <li className="footer__menu-item" key={index}>
                                            <a className="footer__menu-link" href="/">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {socialLinks?.length > 0 && (
                                <Socials className="footer__soc1als" links={socialLinks} />
                            )}
                        </div>
                    ))}
                </nav>
                <div className="footer__extra">
                    <p className="footer__copyright">
                        @<time dateTime="2023">2023</time> streamvib, All Rights Reserved
                    </p>
                    <ul className="footer__extra-list">
                        {extraLinks.map((link, index) => (
                            <li className="footer__extra-item" key={index}>
                            <a className="footer__extra-link" href="/">
                                {link}
                            </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer