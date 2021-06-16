const express = require('express');
const app = express();
const auth = require('./routes/auth');
const port = process.env.PORT || 8080
// const mongoose = require('mongoose');

app.use(express.json());
app.use('/auth',auth);
// mongoose.connect('mongodb://root:mixko50datafordb@mixkoserver.mixko.ml:27017/FloatDB', { useNewUrlParser: true, authSource: 'admin' });
// const db = mongoose.connection;

// db.once('open', function () {
//     console.log("Connected to MongoDB successfully!");
// });
// db.on('error', function (err) {
//     console.log(err);
// });

// app.get('/', (req, res) => {
//     res.send('Hello World!!');
// });
// app.post()
// app.put()
// app.delete()

app.listen(port, () => console.log(`Listening on port ${port}...`))