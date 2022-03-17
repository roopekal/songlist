const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('songs.db');

db.serialize( () => {

    let sql = 'CREATE TABLE song (' +
        'id integer PRIMARY KEY NOT NULL, ' +
        'artist text NOT NULL, ' +
        'song text NOT NULL, ' +
        'picture text, ' +
        'video text )';
        
    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log("Table created");
    });


sql = "INSERT INTO `song` (`id`, `artist`, `song`, `picture`, `video`) "+
	" VALUES (1, 'System of a Down', 'B.Y.O.B', 'soad.jpg', 'https://www.youtube.com/watch?v=zUzd9KyIDrM')";
	db.run(sql, (err) => {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Row added");
	});

	sql = "INSERT INTO `song` (`id`, `artist`, `song`, `picture`, `video`) "+
	" VALUES (2, 'Ensiferum', 'One Man Army', 'ensiferum.jpg', 'https://www.youtube.com/watch?v=uv0CRm94ObE')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Row added");
	});

	sql = "INSERT INTO `song` (`id`, `artist`, `song`, `picture`, `video`) "+
	" VALUES (3, 'Kiuas', 'The Spirit Of Ukko', 'kiuas.jpg', 'https://www.youtube.com/watch?v=qSjMhVNifzs')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Row added");
	});

	db.each("SELECT id, song FROM song", function(err, row) {
		if (err) {
		  return console.log(err.message);
		}
		console.log(row.id + ", " + row.song);
	});

	db.close();
});