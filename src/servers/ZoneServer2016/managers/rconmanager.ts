// ======================================================================
//
//   GNU GENERAL PUBLIC LICENSE
//   Version 3, 29 June 2007
//   copyright (C) 2020 - 2021 Quentin Gruber
//   copyright (C) 2021 - 2024 H1emu community
//
//   https://github.com/QuentinGruber/h1z1-server
//   https://www.npmjs.com/package/h1z1-server
//
//   Based on https://github.com/psemu/soe-network
// ======================================================================
import { WebSocketServer } from "ws";
import { EventEmitter } from "node:events";
import { Server, createServer } from "node:http";

export interface RconMessage {
  type: RconMessageType;
  payload: unknown;
  protocolVersion: number;
}
export enum RconMessageType {
  ExecCommand = 1
}
export class RConManager extends EventEmitter {
  server: Server;
  wss!: WebSocketServer;
  // Managed by config
  wssPort: number = 0;
  password: string = "";

  constructor() {
    super();
    this.server = createServer();
  }

  start() {
    if (process.env.FORCE_DISABLE_WS || !this.wssPort || !this.password) {
      console.log("RConManager disabled");
      return;
    }
    console.log("RConManager start");

    this.wss = new WebSocketServer({ noServer: true });
    this.wss.on("connection", (ws) => {
      ws.on("message", (message) => {
        this.emit("message", ws, JSON.parse(message.toString()));
      });
    });

    this.server.on("upgrade", (req, socket, head) => {
      socket.on("error", console.error);
      if (req.headers.authorization?.replace("Bearer ", "") !== this.password) {
        socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
        socket.destroy();
        return;
      }
      this.wss.handleUpgrade(req, socket, head, (ws) => {
        this.wss.emit("connection", ws);
      });
    });
    this.server.listen(this.wssPort);
  }

  async stop() {
    // const close = promisify(this.wss.close);
    // await close();
  }
}
