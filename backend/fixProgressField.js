require('dotenv').config();
const mongoose = require('mongoose');
const Application = require('./models/application');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    // Set all progress fields that are not ObjectId to null
    const result = await Application.updateMany(
      { progress: { $type: 'number' } }, // or use $exists: true if you want to reset all
      { $unset: { progress: "" } }
    );
    console.log("Updated applications:", result);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
