const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        let noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        res.json(noteData);
    });

    app.get('/api/notes/:id', (req, res) => {
        let noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        const chosen = req.params.id;
        console.log(chosen);
    
        for (let i = 0; i < noteData.length; i++) {
            if (chosen === noteData[i].id) {
                return res.json(noteData[i]);
            }
        }
        return res.json(false);
    });

    app.post('/api/notes', (req, res) => {
        let noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        let newNote = req.body;
        let id = uuidv4();
    
        newNote.id = id;
        noteData.push(newNote);
    
        fs.writeFile("./db/db.json", JSON.stringify(noteData, '\t'), err => {
            if (err) throw err;
            return true;
        });
        res.json(true);
    });

    app.delete('/api/notes/:id', (req,res) => {
        let noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        const chosen = req.params.id;
        console.log(chosen);
    
        for (let i = 0; i < noteData.length; i++) {
            if (chosen === noteData[i].id) {
                noteData.splice(i, 1);
                fs.writeFile("./db/db.json", JSON.stringify(noteData, '\t'), err => {
                    if (err) throw err;
                    return true;
                });
                return res.json(noteData);
            }
        }
        return res.json(false);
    }); 
};
