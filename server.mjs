import Fastify from "fastify";
import { fastifyConnectPlugin } from "@connectrpc/connect-fastify";
import { GreeterService } from "./gen/greeter_pb.js";

const fastify = Fastify({
  http2: true,
});

await fastify.register(fastifyConnectPlugin, {
  routes: (router) =>
    router.service(GreeterService, {
      async sayHello(req) {
        return {
          message: `Hello ${req.name}!`,
        };
      },
    }),
});

try {
  await fastify.listen({ port: 4000, host: "localhost" });
  console.log("Server is running at http://localhost:4000");
} catch (err) {
  process.exit(1);
}
