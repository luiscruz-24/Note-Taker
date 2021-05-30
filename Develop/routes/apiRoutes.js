const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        let note = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        res.json(note);
    });

    app.get('/api/notes/:id', (req, res) => {
        let note = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        const chosen = req.params.id;
        console.log(chosen);
    
        for (let i = 0; i < note.length; i++) {
            if (chosen === note[i].id) {
                return res.json(note[i]);
            }
        }
        return res.json(false);
    });

    app.post('/api/notes', (req, res) => {
        let note = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        let newNote = req.body;
        let id = uuidv4();
    
        newNote.id = id;
        note.push(newNote);
    
        fs.writeFile("./db/db.json", JSON.stringify(note, '\t'), err => {
            if (err) throw err;
            return true;
        });
        res.json(true);
    });

    app.delete('/api/notes/:id', (req,res) => {
        let note = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        const chosen = req.params.id;
        console.log(chosen);
    
        for (let i = 0; i < note.length; i++) {
            if (chosen === note[i].id) {
                note.splice(i, 1);
                fs.writeFile("./db/db.json", JSON.stringify(note, '\t'), err => {
                    if (err) throw err;
                    return true;
                });
                return res.json(note);
            }
        }
        return res.json(false);
    }); 
};
