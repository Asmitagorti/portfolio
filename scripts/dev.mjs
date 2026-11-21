import { spawn } from 'node:child_process';

const args = process.argv.slice(2).filter(argument => argument !== '--strictPort');
const hostFlag = args.indexOf('--host');
if (hostFlag >= 0) args[hostFlag] = '--hostname';
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev', ...args], { stdio: 'inherit' });
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.kill(signal));
}
server.on('exit', code => process.exit(code ?? 0));
