import { useEffect } from 'react'
import { useThree } from "@react-three/fiber"
import { useStore } from '@/Store'
import { Scene } from '@/components/Scenes'
export default function SceneFallBack(props) {
    const data = useThree()
    const init = useStore((state) => state.initOnScreen)
    useEffect(() => {

        init(data)
    }, [data, init])
    return (
        <>
            <Scene></Scene>
        </>
    )
}

