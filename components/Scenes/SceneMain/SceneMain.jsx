import { useEffect } from 'react'
import { CameraControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useStore } from '@/Store/StoreWorker'
import { Object3DNode, extend } from '@react-three/fiber'
import { LumaSplatsThree, LumaSplatsSemantics } from '@lumaai/luma-web'
extend({ LumaSplats: LumaSplatsThree })

export function SceneMain(props) {

    const data = useThree()
    const init = useStore((state) => state.initOffScreen)
    useEffect(() => {
        init(data, true)
    }, [data, init])
    return (
        <>
            <CameraControls />
            <lumaSplats
                semanticsMask={LumaSplatsSemantics.FOREGROUND}
                source='https://lumalabs.ai/capture/822bac8d-70d6-404e-aaae-f89f46672c67'
                position={[-1, 0, 0]}
                scale={0.5}
            />
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color="green" />

            </mesh>
        </>
    )
}

