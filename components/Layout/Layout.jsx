"use client"
import { useEffect } from 'react'
import { Preloader } from "@/components/Preloader"
import { useStore } from '@/Store'
import dynamic from 'next/dynamic'

const Canvas = dynamic(() => import('@/components/Canvas'), { ssr: false })
export function Layout({ children }) {
    const init = useStore((state) => state.Actions.init)
    useEffect(() => {
        init()
    })
    return (
        <div>
            <Canvas></Canvas>
            <Preloader></Preloader>
            {children}


        </div>
    )
}

