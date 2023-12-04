import { CameraControls } from "@react-three/drei"

export function SceneMain(props) {
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

