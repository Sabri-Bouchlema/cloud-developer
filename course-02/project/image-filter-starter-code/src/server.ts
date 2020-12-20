import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';
import Jimp = require('jimp');

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get("/filteredimage", async (req, res) => {
    let { image_url } = req.query;

    if (!image_url) {
      return res.status(400).send({ message: 'image_url is required' });
    }

    const isImageValid = await Jimp.read(image_url).catch(() => {
      return null;
    })

    if (!isImageValid) {
      return res.sendStatus(422);
    }

    const filteredImage = await filterImageFromURL(image_url);

    res.sendFile(filteredImage, () => deleteLocalFiles([filteredImage]));
  });

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  });


  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();