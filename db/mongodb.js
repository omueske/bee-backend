let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

// let hiveSchema = new mongoose.Schema({
//     id: Number,
//     buildType: String,
//     sections: Array,
//     hiveLog: Array
// })

//console.log(hiveSchema)
//var htest = mongoose.model('hiveTest', hiveSchema);

// let hivetest = new htest({
//     id: 2,
//     buildType: "Zander",
//     sections: [{
//     "BS1": "Zander",
//     "BS2": "Zander",
//     "HS1": "Zander 1/2"
//     }],
//     hiveLog: [{
//     "date": "9452952532",
//     "finding": [{
//         "eggs": true,
//         "larves": true,
//         "capped": true
//     }],
//     "frame": [{
//         "brood": 0,
//         "food": 0,
//         "comb": -1,
//         "empty": 0,
//         "foundation": 1
//     }],
//     "food": [{
//         "sirup": 20,
//         "pastry": 14
//     }],
//     meekness: 2,
//     comment: "Mouse at the Hive again"
//     }]
// })

// hivetest.save(function (err, hive) {
//   if (err) return console.error(err);
// });


export default mongoose;