import logoWhite from '../../assets/logo.svg'
import logoGreen from '../../assets/logoGreen.png'
import * as styled from './header.module.css'
import { PiListFill } from 'react-icons/pi'

export function Header() {

    const screenSize = window.screen.width;

    const isMobile = screenSize < 920;

    return (
        <div className={styled.container}>
            {isMobile && (
                <div className={styled.navigationMobile}>
                    <PiListFill />
                    <img src={logoGreen} className={styled.logo} />

                </div>
            )}
            {!isMobile && (
                <>
                    <img src={logoWhite} className={styled.logo} />
                    <ul className={styled.navigation}>
                        <li className={styled.navigationItem}><a href="#ranger-storm">RANGER STORM</a></li>
                        <li className={styled.navigationItem}><a href="#ranger-black">RANGER BLACK</a></li>
                    </ul>
                </>

            )}
        </div>
    )
}