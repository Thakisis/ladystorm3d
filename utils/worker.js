export function CreateWorker() {
    const worker = new Worker(new URL('@/components/render.js', import.meta.url), { type: 'module' })
    return worker
}