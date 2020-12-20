import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';
import Jimp = require('jimp');
import { Request, Response } from "express";

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get("/filteredimage", async (req: Request, res: Response) => {
    let image_url: string = req.query.image_url;

    if (!image_url) {
      return res.status(400).send({ message: 'image_url is required' });
    }

    const isImageValid: Jimp = await Jimp.read(image_url).catch(() => {
      return null;
    })

    if (!isImageValid) {
      return res.sendStatus(422);
    }

    const filteredImage: string = await filterImageFromURL(image_url);

    res.sendFile(filteredImage, () => deleteLocalFiles([filteredImage]));
  });

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req: Request, res: Response) => {
    res.send("try GET /filteredimage?image_url={{}}")
  });


  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();