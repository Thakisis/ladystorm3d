import { useEffect } from 'react'
import { useThree } from "@react-three/fiber"

import { useStoreThree } from '@/Store/StoreThree'
import Scene from '@/components/Scenes'
export default function RunWorker(props) {
    const data = useThree()

    const initThree = useStoreThree((state) => (state.initThree))
    useEffect(() => {
        initThree({ threeParams: data, isWorker: true })
    }, [data, initThree])
    return (
        <>
            <Scene worker></Scene>


        </>
    )
}

