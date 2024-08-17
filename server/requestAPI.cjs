const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(bodyParser.json());

// 解决跨域
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   next();
});

app.post('/token', urlencodedParser, async (req, res) => {
   const { apiKey, appSecret } = req.body;
   if (!apiKey || !appSecret) {
      return res
         .status(400)
         .json({ error: 'apiKey and apiSecret are required' });
   }

   const data = {
      grant_type: 'client_credentials',
      client_id: apiKey,
      client_secret: appSecret,
   };

   const entries = Object.entries(data);

   const url =
      'https://aip.baidubce.com/oauth/2.0/token?' +
      entries.map(([k, v]) => `${k}=${v}`).join('&');

   const ret = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
   })
      .then((res) => {
         return res.json();
      })
      .then((data) => {
         return data.access_token;
      })
      .catch((err) => {
         console.error('[preload.ts] getAccessToken() : ' + err);
         return null;
      });

   return res.status(200).json(ret);
});

app.post('/generate', urlencodedParser, async (req, res) => {
   const { count, data } = req.body;
   const accessToken = req.get('authorization');

   if (!count || !data) {
      return res.status(400).json({ error: 'prompt is required' });
   }

   if (!accessToken) {
      return res.status(401).json({ error: 'accessToken is required' });
   }

   const prompt =
      '#请你扮演我的JSON mock生成助理;' +
      '#生成的数据最外层是一个Array;' +
      '#我的提示将会遵循以下格式:' +
      '[format]:数据结构（每条数据的描述格式为："数据名称"<数据格式>(数据描述)[count]:需要生成mock的数量;' +
      '#请你务必将产生的JSON mock包含在[BEGIN][END]块中;' +
      '#你的回答只需要给出[BEGIN][END]的部分即可，不需要其他的回答;' +
      '现在请你根据以下提示生成：[target]:{' +
      data +
      `}[count]:${count}`;

   const url =
      'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/yi_34b_chat?' +
      `access_token=${accessToken}`;
   const requestBody = {
      messages: [
         {
            role: 'user',
            content: prompt,
         },
      ],
   };

   const ret = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
   })
      .then((res) => {
         return res.json();
      })
      .then((data) => {
         return data.result;
      })
      .catch((err) => {
         return `[BEGIN][ERR]错误：${err}[END]`;
      });

   return res.status(200).json({ data: ret });
});

app.listen(3000, () => {
   console.log('Server started on port 3000');
});
