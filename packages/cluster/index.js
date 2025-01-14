import { cpus } from 'os';
import cluster from 'cluster';
import { createServer } from 'http';

export default function (app, num) {
	if (cluster.isMaster) {
		return {
			listen(PORT) {
				let cpu = cpus().length;
				let max = Math.min(num || cpu, cpu);
				while (max--) cluster.fork({ PORT });
			}
		};
	}

	return typeof app.listen === 'function' ? app : createServer(app);
}
