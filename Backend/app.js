const express = require('express');
const app = express();
const auth = require('./routes/auth');
const senior = require('./routes/senior');
const junior = require('./routes/junior');
const port = process.env.PORT || 8080
const mongoose = require('mongoose');

// 1001 = success
// 1002 = server fault
// 1003 = user fault
// 1004 = user fault

app.use(express.json());
app.use('/auth', auth);
app.use('/senior', senior);
app.use('/junior', junior);
mongoose.connect('mongodb://root:mixko50datafordb@mixkoserver.mixko.ml:27017/FloatDB', { useNewUrlParser: true, authSource: 'admin', useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', function () {
    console.log("Connected to MongoDB successfully!");
});
db.on('error', function (err) {
    console.log(err);
});

// app.get('/', (req, res) => {
//     res.send('Hello World!!');
// });
// app.post()
// app.put()
// app.delete()

app.listen(port, () => console.log(`Listening on port ${port}...`))