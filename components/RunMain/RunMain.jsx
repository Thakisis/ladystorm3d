import { useEffect } from 'react'
import { useThree } from "@react-three/fiber"
import { useStore } from '@/Store'
import { useStoreThree } from '@/Store/StoreThree'
import Scene from '@/components/Scenes'

export default function RunMain(props) {
    const data = useThree()
    const { initMain, getMain } = useStore((state) => ({ initMain: state.initMain, getMain: state.getMain }))
    const { initThree, getThree } = useStoreThree((state) => ({ initThree: state.initThree, getThree: state.getThree }))
    useEffect(() => {
        initMain(getThree)
        initThree({ threeParams: data, isWorker: false, getMain })
    }, [data, initThree, getThree, initMain, getMain])
    return (
        <>
            <Scene></Scene>
        </>
    )
}

