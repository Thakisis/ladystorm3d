"use client"

import { lazy, useEffect } from 'react'
import { CanvasOffScreen } from '@/utils/CanvasOffScreen'
import { useStore } from '@/Store'
import styles from './Canvas.module.scss'

const SceneFallBack = lazy(() => import('@/components/RunMain'))
const worker = new Worker(new URL('@/components/render.js', import.meta.url), { type: 'module' })

export default function Canvas() {

    const setWorker = useStore(state => state.Actions.setWorker)
    useEffect(() => {
        setWorker(worker)
    })
    return <CanvasOffScreen
        className={styles.canvasThree}
        shadows

        worker={worker} fallback={<SceneFallBack worker={true}
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