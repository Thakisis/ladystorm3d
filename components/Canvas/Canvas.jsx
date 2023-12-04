"use client"

import { lazy } from 'react'
import { CanvasOffScreen } from '@/utils/CanvasOffScreen'
import { useStore } from '@/Store'
import styles from './Canvas.module.scss'

const SceneFallBack = lazy(() => import('@/components/Scenes/SceneFallBack'))


export default function Canvas() {
    const worker = useStore(state => state.worker)
    return <CanvasOffScreen
        className={styles.canvasThree}
        shadows

        worker={worker} fallback={<SceneFallBack
            styles
        />}
        style={{ position: "absolute", top: "0", left: "0", width: "100dvw", height: "100dvh" }}
    />

}


/*
 camera={{
            position: [0.3415782153606415, 1.5268054008483887, 6.334390640258789],
            fov: 14.42629256144392,
            rotation: [-0.11957646228492426, 0.2607398954694035, 0.030960167360111694],
            far: 99.98999786376953,
            near: 0.009999999776482582
        }}
        */