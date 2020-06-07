module.exports = mongoose => {
    const beeHiveLogSchema = mongoose.Schema({
      logId: String,
      date: Date,
      findings: Array,
      frames: Array,
      food: Array,
      meekness: Number,
      comment: String
    })
    const BeeHive = mongoose.model(
      "BeeHive",
      mongoose.Schema(
        {
            name: String,
            buildType: String,
            sections: Array,
            hiveLog: [ beeHiveLogSchema ],
            todos: Array,
            comment: String,
            updatedAt: { type: Date, default: Date.now }
        },
        { timestamps: true }
      )
    );
    return BeeHive;
  };