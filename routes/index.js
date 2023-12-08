import express from 'express';
import fs from'fs'
import { fileURLToPath } from 'url';
import path from 'path'
const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/', function (req, res, next) {
  res.render('index.html')
})

router.get('/jsonFile', function(req, res, next) {
  fs.readFile(path.join(__dirname,'../', 'public','config.json'),(err,data)=>{
    if (err) {
      throw err;
  }
  res.send(data)
  })
});

export default router;
