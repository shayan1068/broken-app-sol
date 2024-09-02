const express = require('express');
let axios = require('axios');
var app = express();

app.use(express.json());

app.post('/', async function (req, res, next) {
  try {
    let results = await Promise.all(
      req.body.developers.map(async (developer) => {
        const response = await axios.get(`https://api.github.com/users/${developer}`);
        return response.data;
      })
    );
    let output = results.map((user) => ({
      name: user.name,
      bio: user.bio
    }));

    return res.json(output);
  } catch (err) {
    next(err);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
