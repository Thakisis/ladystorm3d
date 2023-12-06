import { useEffect } from 'react'
import { CameraControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useStore } from '@/Store/StoreWorker'
export function SceneMain(props) {

    const data = useThree()
    const init = useStore((state) => state.initOffScreen)
    useEffect(() => {
        init(data, true)
    }, [data, init])
    return (
        <>
            <CameraControls />
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color="green" />

            </mesh>
        </>
    )
}

