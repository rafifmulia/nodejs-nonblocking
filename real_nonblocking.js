const workerpool = require('workerpool');
const pool = workerpool.pool();

function loop() {
  let c = 0;
  ++c;
  console.log('start number - ' + c);
  for (let i = 0; i<6000000000; i++) {}
  console.log('is NONBLOCKING code ? number - ' + c);
  return c;
}

function nonblockingCode() {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await pool.exec(loop);
      pool.terminate(); // terminate all workers when done
      resolve(data);
    } catch (err) {
      console.error(err);
    }
  });
}

async function nonblocking() {
  let res;
  res = nonblockingCode();
  res = nonblockingCode();
  console.log(res);
}

nonblocking();

/**
 * reference :
 * - https://www.npmjs.com/package/workerpool
 * - https://nodejs.org/en/docs/guides/dont-block-the-event-loop/
 * - https://javascript.plainenglish.io/multitasking-in-node-js-using-worker-pool-201ac6dfd0f4
 */
