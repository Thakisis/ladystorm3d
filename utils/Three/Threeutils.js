import { GLTFLoader, KTX2Loader, DRACOLoader } from 'three-stdlib'
import { MeshoptDecoder } from 'three-stdlib'
import * as THREE from 'three'
import { filetype } from '@/Data/Types'


//create loader instances
export function createLoaders(gl) {
    const loader = new THREE.TextureLoader()
    const gltfLoader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    const ktx2Loader = new KTX2Loader()
    dracoLoader.setDecoderPath('/libs/draco/')
    gltfLoader.setDRACOLoader(dracoLoader)
    ktx2Loader.setTranscoderPath('/libs/basis/')
    ktx2Loader.detectSupport(gl)
    gltfLoader.setKTX2Loader(ktx2Loader)
    gltfLoader.setMeshoptDecoder(MeshoptDecoder)
    return { loader, gltfLoader }
}



export async function loadModelo({ gltfLoader, model, onProgress, onComplete, scene }) {
    const { name, path, file, size, type } = model
    return new Promise((resolve) => {
        gltfLoader.loadAsync(`/Models${path}/${file}`,
            (xhr) => {
                onProgress(xhr.loaded, size, name, scene)
            },
        ).then((gltf) => {
            if (type === filetype.material) {
                let materials = getMaterials(gltf.scene)
                resolve({ filetype: filetype.material, materials: { [name]: materials } })
            }
            if (type === filetype.mesh) {

                const nodes = getNodes(gltf.scene)
                const animations = getAnimation(gltf)

                resolve({ filetype: filetype.mesh, name, model: gltf.scene, nodes, animations: animations, cameras: gltf.cameras })

            }
            if (type === filetype.animation) {
                //const animations = getAnimation(gltf)

                //resolve({ filetype: filetype.animation, name, animations })

            }

        })
    })
}

export function loadModels({ loaders, ...loaderEvents }) {
    const model = {
        path: '',
        name: "harleySinger",
        file: 'Harley.glb',
        size: 11194812,
        type: filetype.mesh

    }
    const loadmodels = loadModel({ gltfLoader: loaders.gltfLoader, model, ...loaderEvents })

}


export async function loadModel({ gltfLoader, model, onProgressLoad, onCompleteLoad, scene }) {
    const { name, path, file, size, type } = model

    return new Promise((resolve) => {
        gltfLoader.loadAsync(`/models${path}/${file}`,
            (xhr) => {
                onProgressLoad({ loaded: xhr.loaded, size: size, name })
                //onProgress(xhr.loaded, size, name, scene)
            },
        ).then((gltf) => {
            onCompleteLoad({ model: gltf, name })
            resolve(gltf)
            /*
            if (type === filetype.material) {
                let materials = getMaterials(gltf.scene)
                resolve({ filetype: filetype.material, materials: { [name]: materials } })
            }
            if (type === filetype.mesh) {

                const nodes = getNodes(gltf.scene)
                const animations = getAnimation(gltf)

                resolve({ filetype: filetype.mesh, name, model: gltf.scene, nodes, animations: animations, cameras: gltf.cameras })

            }
            if (type === filetype.animation) {
                //const animations = getAnimation(gltf)

                //resolve({ filetype: filetype.animation, name, animations })

            }*/

        })
    })
}
