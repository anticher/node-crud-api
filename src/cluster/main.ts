import cluster from 'cluster'
import os from 'os'
import { startServer } from '../server/startServer'

if (cluster.isPrimary) {
    const count = os.cpus().length
    console.log('Primary pid:' + process.pid)
    console.log('Workers count - ' + count)
    for (let i = 0; i < count; i++) {
        cluster.fork()
    }
} else {
    const id = cluster.worker?.id
    console.log(id)
    console.log('Worker:' + id, 'pid:' + process.pid)
    startServer()
}
