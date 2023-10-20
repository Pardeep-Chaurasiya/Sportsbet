const WebSocket = require("ws");
const cron = require("node-cron");

const { Tournament } = require("../models");

const url = "wss://eu-swarm-ws.betconstruct.com/";
const ws = new WebSocket(url);

ws.on("open", () => {
  console.log("Connected to the WebSocket server");

  request_one = {
    command: "request_session",
    params: { site_id: 851, language: "eng" },
    rid: 1,
  };
  let sendingDataText = JSON.stringify(request_one);
  ws.send(sendingDataText);

  // request_two = {
  //   command: "get",
  //   params: {
  //     source: "betting",
  //     what: {
  //       game: [],
  //       market: [
  //         "id",
  //         "type",
  //         "express_id",
  //         "name",
  //         "base",
  //         "display_key",
  //         "display_sub_key",
  //         "main_order",
  //         "order",
  //         "col_count",
  //         "cashout",
  //         "group_id",
  //         "group_name",
  //       ],
  //       event: ["id", "price", "type", "name", "order", "base"],
  //     },
  //     where: { game: { id: 23262490 } },
  //     subscribe: true,
  //   },
  //   rid: 9,
  // };
  // let sendingDataText_two = JSON.stringify(request_two);
  // ws.send(sendingDataText_two);

  (async () => {
    tournamentmentData = await Tournament.findAll({ raw: true });
    tournamentmentData.map((item) => {
      request_six = {
        command: "get_results",
        params: {
          game_id: item.MatchId,
        },
        rid: 13,
      };
      let sendingDataText_six = JSON.stringify(request_six);
      ws.send(sendingDataText_six);
    });
  })();
});

ws.on("message", async (data) => {
  // console.log(JSON.parse(data));
  console.log(`Received data from the server: ${data}\n`);
});
