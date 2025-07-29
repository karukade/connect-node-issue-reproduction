import { createClient } from "@connectrpc/connect";
import { GreeterService } from "./gen/greeter_pb.js";
import {
  createGrpcTransport,
  Http2SessionManager,
} from "@connectrpc/connect-node";
import { setTimeout } from "node:timers/promises";

const sessionManager = new Http2SessionManager("http://localhost:9000");

const client = createClient(
  GreeterService,
  createGrpcTransport({
    baseUrl: "http://localhost:9000",
    sessionManager,
  })
);

while (true) {
  console.log(
    "shuttingDown.length:",
    sessionManager.shuttingDown.length
  );
  await client.sayHello({
    name: "World",
  });
  await setTimeout(2000);
}
