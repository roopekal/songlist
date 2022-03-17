const express = require('express');
const app = express();

const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}))

var helmet = require('helmet')
app.use(helmet())

app.use(express.json());
express.urlencoded({limit: '5mb', extended: true});

const cors = require('cors');
app.use(cors());

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('songs.db');

app.listen(8080, () => {
    console.log('Node works localhost:8080');
});

app.get('/', (req, res, next) => {
    return res.status(200).json({ error: false, message: 'Works' })
});

app.get('/song/all', (req, res, next) => {
	db.all('select * from song', function (error, result) {
		if (error) throw error;

		return res.status(200).json(result);
	});
})

app.get('/song/one/:id', (req, res, next) => {
	let id = req.params.id;

    db.get('select * from song where id = ?', [id], (error, result) => {
		if (error) throw error;

		// Oliko vastaus tyhjä
		if (typeof(result) == 'undefined') {
			return res.status(200).json({});
		}

		return res.status(200).json(result);
	});
})

app.get('/song/video/:id', (req, res, next) => {
	let id = req.params.id;

    db.get('select video from song where id = ?', [id], (error, result) => {
		if (error) throw error;

		// Oliko vastaus tyhjä
		if (typeof(result) == 'undefined') {
			return res.status(200).json({});
		}

		return res.status(200).json(result);
	});
})

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './images')
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

app.post('/song/add',  upload.single('picture'), (req, res, next) => {
  let song = req.body;

  let picture = null;
  if (req.file) {
    picture = req.file.originalname;
  }
 
  db.run('insert into song (artist,song,picture,video) values (?, ?, ?, ?)',
	      [song.artist, song.song, picture, song.video], (error, result) => {
		if (error) throw error;

		return res.status(200).json( {count: 1} );
	});
})

app.get('/download/:picture', (req, res, next) => {
    var file = './images/' + req.params.picture;
    res.download(file);
});

app.get('/song/delete/:id', (req, res, next) => {
	let id = req.params.id;

  	db.run('delete from song where id = ?', [id], function (error, result) {
		if (error) throw error;

		return res.status(200).json( {count: this.changes} );
	});
})

app.get('*', (req, res, next) => {
    return res.status(404).json({ error: true, message: 'No such path' })
})