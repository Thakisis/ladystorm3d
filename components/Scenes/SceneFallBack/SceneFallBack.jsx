import { useEffect } from 'react'
import { CameraControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useStore } from '@/Store'
export default function SceneFallBack(props) {
    const data = useThree()
    const init = useStore((state) => state.initOnScreen)
    useEffect(() => {

        init(data, false)
    }, [data, init])
    return (
        <>
            <CameraControls />
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color="red" />

            </mesh>
        </>
    )
}

