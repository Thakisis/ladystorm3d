"use client"
import { Preloader } from "@/components/Preloader"
import dynamic from 'next/dynamic'

const Canvas = dynamic(() => import('@/components/Canvas'), { ssr: false })
export function Layout({ children }) {

    return (
        <div>
            <Canvas></Canvas>
            <Preloader></Preloader>
            {children}


        </div>
    )
}
