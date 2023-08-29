import { web } from "./src/app/web.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;
web.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
