import app from "./app.js";
import { makeAllPrerequisiteConnection } from "./config/index.js";
import { configDotenv } from "dotenv";
import { PORT } from "./env.js";

configDotenv();
const port = PORT || 3000;

(async () => {
  await makeAllPrerequisiteConnection();
  app.listen(port, () => console.log(`Running on port ${port}`));
})();
