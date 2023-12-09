"use client"
import { Logo } from "./Logo"
import styles from './Preloader.module.scss'
import { useStore } from "@/Store"
export function Preloader() {

    const { percent, complete } = useStore((state) => state.loading)
    //const models = useStore((state) => state.models)
    //  console.log(models)
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-50 justify-between  
        flex bg-black"
            style={{ backgroundImage: 'url(images/BackgroundLoader.webp)', backgroundSize: "cover", opacity: complete ? 0 : 1, transition: '1s opacity ease-in', pointerEvents: 'none' }}
        >
            <div className={styles.content} >
                <div className={styles.logoContainer}>
                    <Logo percent={percent}></Logo>
                </div>
                <div className={styles.loadingContainer}>
                    <span>loading</span><span>{parseInt(percent)}%</span>
                </div>

            </div>
            <div className="flex absolute h-screen right-0   pt-20">

                <video loop muted playsInline autoPlay
                    className="object-contain object-right-bottom"
                    poster="/images/LadyStormthumb.webp"
                    onClick={() => { console.log("click") }}
                    style={{ pointerEvents: 'all' }}
                >
                    <source
                        src="/videos/Preload.webm"
                        type="video/webm" />
                </video>
            </div>
        </div >
    )
}

