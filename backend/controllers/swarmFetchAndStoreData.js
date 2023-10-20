const WebSocket = require("ws");

const { Bet, Tournament } = require("../models");

const fetchBetAndTournamentData = async (req, res) => {
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

  ws.on("message", (data) => {
    console.log("Receive data from server : ", data.toString(), "\n");
  });

  return res.json("fetching data");
};

module.exports = { fetchBetAndTournamentData };
