const { createApp } = require('./src/app');

const app = createApp();
const port = 3000;

// Stage 0 — start the server
app.listen(port, () => {
  console.log(`CRUD API listening on port ${port}`);
});
