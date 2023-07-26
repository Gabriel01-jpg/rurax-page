import { useEffect, useState } from 'react'
import * as styled from './footer.module.css'
import { BsInstagram } from 'react-icons/bs'
import { CgWebsite } from 'react-icons/cg'

export function Footer() {

    const [isOpen, setIsOpen] = useState(false);

    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (scrollPosition > 650) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }, [scrollPosition])

    return (
        <footer className={`${styled.footer} ${isOpen ? `${styled.animationOpen}` : `${styled.animationClose}`}`}>
            <p>Explore Rurax em: </p>
            <div className={styled.icons}>
                <a href="https://rurax.com.br" target='__blank'>
                    <CgWebsite />
                </a>
                <a href="https://www.instagram.com/ruraxoficial/" target='__blank'>
                    <BsInstagram />
                </a>
            </div>

        </footer>
    )
}