import logo from '../../assets/logo.svg'
import * as styled from './header.module.css'
import { PiListFill } from 'react-icons/pi'

export function Header() {

    const screenSize = window.screen.width;

    const isMobile = screenSize < 920;

    console.log(isMobile);

    return (
        <div className={styled.container}>
            {isMobile && (
                <PiListFill />
            )}
            {!isMobile && (
                <>
                    <img src={logo} className={styled.logo} />
                    <ul className={styled.navigation}>
                        <li className={styled.navigationItem}><a href="#ranger-storm">RANGER STORM</a></li>
                        <li className={styled.navigationItem}><a href="#ranger-black">RANGER BLACK</a></li>
                    </ul>
                </>

            )}
        </div>
    )
}