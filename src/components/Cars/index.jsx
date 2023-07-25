import * as styled from './cars.module.css'
import rangerStorm from '../../assets/rangerStorm.png'
import { useEffect, useRef, useState } from 'react';

export function Cars() {

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

    const carRef = useRef();
    const containterRef = useRef();
    const infosRef = useRef();
    const secondCarRef = useRef();
    const secondInfosRef = useRef();
    const divRef = useRef();

    useEffect(() => {
        const size = divRef.current.offsetHeight - 52;

        carRef.current.style = `transform: translateX(-${scrollPosition * 2}px)`
        infosRef.current.style.transform = `translateX(${scrollPosition * 2}px)`
        secondCarRef.current.style.transform = `translateX(-${Math.abs(scrollPosition - size)}px)`
        secondInfosRef.current.style.transform = `translateX(${Math.abs(scrollPosition - size)}px)`

    }, [scrollPosition])

    return (
        <>
            <div className={styled.container} ref={containterRef} id="ranger-storm">
                <div ref={carRef} className={styled.carContainer}>
                    <img className={styled.carImage} src={rangerStorm} alt="Uma imagem com a ranger storm" />
                    <div className={styled.sloganContainer}>
                        <p className={styled.slogan}>ESSE PREÇO</p>
                        <span className={styled.sloganSpan}>SÓ AQUI!</span>
                    </div>
                </div>
                <div ref={infosRef} className={styled.infos}>
                    <h1 className={styled.carName}>RANGER STORM</h1>
                    <p className={styled.carInfos}>2023 (JUN3)</p>
                    <p className={styled.carInfos}>motor 3.2 200 cv</p>
                    <button className={styled.infosButton} type="button">Saiba mais</button>
                </div>

            </div>
            <div ref={divRef} className={styled.container} id="ranger-black">
                <div ref={secondCarRef} className={styled.carContainer}>
                    <img className={styled.carImage} src={rangerStorm} alt="Uma imagem com a ranger storm" />
                    <div className={styled.sloganContainer}>
                        <p className={styled.slogan}>ESSE PREÇO</p>
                        <span className={styled.sloganSpan}>SÓ AQUI!</span>
                    </div>
                </div>
                <div ref={secondInfosRef} className={styled.infos}>
                    <h1 className={styled.carName}>RANGER STORM</h1>
                    <p className={styled.carInfos}>2023 (JUN3)</p>
                    <p className={styled.carInfos}>motor 3.2 200 cv</p>
                    <button className={styled.infosButton} type="button">Saiba mais</button>
                </div>

            </div>
        </>
    )
}