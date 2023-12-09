import { CameraControls } from "@react-three/drei"
import { useStoreThree } from "@/Store/StoreThree"
import { Environment } from "@react-three/drei"
export default function Scene({ worker }) {
    const model = useStoreThree((state => state.model))
    console.log(model)
    const harley = model && <primitive object={model}></primitive>

    return (
        <>
            <Environment preset="city" />
            <directionalLight></directionalLight>
            <CameraControls></CameraControls>
            {harley}
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={worker ? "green" : "red"} />

            </mesh>
        </>
    )
}
