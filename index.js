const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require('hazelcast-client');

const CLUSTER_NAME = 'hello-world';
const HZ_COUNT_KEY = 'HZ_COUNT_KEY';
const MAP_NAME = 'my-distributed-map';
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


let hzClient = null;
Client.newHazelcastClient({
  clusterName: CLUSTER_NAME,
}).then((client) => hzClient = client);


app.get('/get-count', async (req, res) => {
  const map = await hzClient.getMap(MAP_NAME);
  const hzCount = await map.get(HZ_COUNT_KEY);

  console.log(`hzCount: ${hzCount}`);
  res.json({ count: hzCount });
});


app.post('/increase-count', async (req, res) => {
  const map = await hzClient.getMap(MAP_NAME);
  const hzCount = await map.get(HZ_COUNT_KEY);
  
  await map.put(HZ_COUNT_KEY, hzCount + 1);

  console.log('updated count');
  res.sendStatus(200);
});

app.post('/shutdown-client', async (_req, res) => {
  if (hzClient == null) {
    console.log('Hazelcast client was not created.')
    res.sendStatus(500);
  } else {
    await hzClient.shutdown();
    res.sendStatus(200);
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});