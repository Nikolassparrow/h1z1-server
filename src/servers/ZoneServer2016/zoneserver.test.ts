const log = require("why-is-node-running");
import test from "node:test";
import { ZoneServer2016 } from "./zoneserver";
import { scheduler } from "node:timers/promises";

test("ZoneServer2016", { timeout: 10000 }, async (t) => {
  const ZoneServer = new ZoneServer2016(1117);
  process.setUncaughtExceptionCaptureCallback((err) => {
    console.log(err);
  });
  await t.test("start", async (t) => {
    await ZoneServer.start();
  });
  await t.test("stop", async (t) => {
    await ZoneServer.stop();
  });
});

// test("ZoneServer2016-mongo", { timeout: 10000 }, async (t) => {
//   const ZoneServer = new ZoneServer2016(1117, Buffer.from("fake"), "mongodb://localhost:27017");
//   await t.test("start", async (t) => {
//     await ZoneServer.start();
//   });
//   await scheduler.yield();
//   await t.test("stop", async (t) => {
//     await ZoneServer.stop();
//   });
// });
