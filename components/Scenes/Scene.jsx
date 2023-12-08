import { CameraControls } from "@react-three/drei"
export default function Scene({ worker }) {

    return (
        <>
            <CameraControls></CameraControls>
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color={worker ? "green" : "red"} />

            </mesh>
        </>
    )
}
