import * as styled from './cars.module.css'
import rangerStorm from '../../assets/rangerStorm.png'
import rangerBlack from '../../assets/rangerBlack.png'
import joinImage from '../../assets/join.svg'
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { TbSend } from 'react-icons/tb'
import { BsArrowRight } from 'react-icons/bs'
import Modal from 'react-modal';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { api } from '../../api';


const schema = z.object({
    name: z.string().min(1, { message: 'Informe seu nome:' }),
    email: z.string().email({
        message: 'Informe um email válido.'
    }),
    phone: z.string().refine((val) => /^\d{11}$/.test(val), {
        message: 'Digite um número de telefone válido com 11 dígitos',
    }),
    message: z.string().min(1, { message: 'Informe uma mensagem.' }),
})

export function Cars() {

    const [scrollPosition, setScrollPosition] = useState(0);

    const [modalIsOpen, setIsOpen] = useState(false);

    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    };

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: zodResolver(schema)
    });

    const onSubmit = handleSubmit(async (data) => {
        const { name, email, phone, message } = data;
        try {
            const response = await api.post('/contacts/ford/', {
                name,
                email,
                phone,
                message,
            })
            response && toast.success('Seu contato foi enviado com sucesso.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (e) {
            console.error(e);
            toast.warning('Não foi possível enviar seu contato, tente novamente mais tarde.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        } finally {
            handleCloseModal();
        }

    });

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
        const size = divRef.current.offsetHeight - 30;

        carRef.current.style = `transform: translateX(-${scrollPosition * 2}px)`
        infosRef.current.style.transform = `translateX(${scrollPosition * 2}px)`

        if (scrollPosition > 700) {
            secondCarRef.current.style.transform = `translateX(0px)`
            secondInfosRef.current.style.transform = `translateX(0px)`
        } else {
            secondCarRef.current.style.transform = `translateX(-${Math.abs(scrollPosition - size)}px)`
            secondInfosRef.current.style.transform = `translateX(${Math.abs(scrollPosition - size)}px)`
        }


    }, [scrollPosition])

    function handleOpenModal() {
        document.querySelector('html').style.overflow = "hidden"
        setIsOpen(true);
    }

    function handleCloseModal() {
        document.querySelector('html').style.overflow = ""
        setIsOpen(false);
    }

    return (
        <>
            <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal} overlayClassName="modal-overlay" className="modal-content" preventScroll={true} >
                <div className={styled.close} onClick={handleCloseModal}>
                    <BsArrowRight />
                </div>
                <div className={styled.titleContainer}>
                    <h2 className={styled.title}>Entre em contato conosco.</h2>
                    <img className={styled.joinImage} src={joinImage} alt="Rapaz dando joinha." />
                </div>
                <form className={styled.form} onSubmit={onSubmit}>
                    <div>
                        <label className={styled.label}>Nome:</label>
                        <input type="text" className={styled.input} placeholder="Digite seu nome:" {...register('name')} />
                        {errors.name && <p className={styled.error}>{errors.name.message}</p>}
                    </div>
                    <div>
                        <label className={styled.label}>Email:</label>
                        <input type="text" className={`${styled.input}`} placeholder="Digite seu email:" {...register('email')} />
                        {errors.email && <p className={styled.error}>{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className={styled.label}>Telefone:</label>
                        <input type="text" className={styled.input} placeholder="Digite seu telefone:" {...register('phone')} />
                        {errors.phone && <p className={styled.error}>{errors.phone.message}</p>}
                    </div>
                    <div>
                        <textarea className={styled.textarea} placeholder="Sua mensagem vem aqui." {...register('message')} >
                            Gostaria de saber mais sobre essa oferta...
                        </textarea>
                        {errors.message && <p className={styled.error}>{errors.message.message}</p>}
                    </div>
                    <button type="submit" className={styled.sent} disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                Enviando...
                            </>
                        ) : (
                            <>
                                <TbSend /> Enviar
                            </>
                        )}
                    </button>
                </form>
            </Modal>
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
                    <button className={styled.infosButton} type="button" onClick={handleOpenModal}>Saiba mais</button>
                </div>

            </div>
            <div ref={divRef} className={styled.container} id="ranger-black">
                <div ref={secondCarRef} className={styled.carContainer}>
                    <img className={styled.carImage} src={rangerBlack} alt="Uma imagem com a ranger storm" />
                    <div className={styled.sloganContainer}>
                        <p className={styled.slogan}>ESSE PREÇO</p>
                        <span className={styled.sloganSpan}>SÓ AQUI!</span>
                    </div>
                </div>
                <div ref={secondInfosRef} className={styled.infos}>
                    <h1 className={styled.carName}>RANGER BLACK</h1>
                    <p className={styled.carInfos}>2023 (JUN3)</p>
                    <button className={styled.infosButton} type="button" onClick={handleOpenModal}>Saiba mais</button>
                </div>

            </div>
        </>
    )
}