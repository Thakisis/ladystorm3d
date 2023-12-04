"use client"
import styles from './Preloader.module.scss'
import { useStore } from '@/Store'
export function Preloader(props) {
    const state = useStore()

    return (
        <div className={styles.preloader}>
            Preloader
        </div>
    )
}

