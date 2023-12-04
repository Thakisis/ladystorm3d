

function SceneFallBack(props) {
    return (
        <>
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color="red" />
            </mesh>
        </>
    )
}

export default SceneFallBack