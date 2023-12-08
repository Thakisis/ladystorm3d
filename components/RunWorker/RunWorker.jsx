import { useEffect } from 'react'
import { useThree } from "@react-three/fiber"
import { useStore } from '@/Store/StoreWorker'
import { Scene } from '@/components/Scenes'

export default function RunMain(props) {

    const data = useThree()
    const init = useStore((state) => state.initOffScreen)
    useEffect(() => {
        init(data, true)
    }, [data, init])
    return (
        <>
            <Scene worker></Scene>


        </>
    )
}

