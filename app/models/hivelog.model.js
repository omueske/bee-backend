module.exports = mongoose => {
    const BeeHiveLog = mongoose.model(
      "BeeHiveLog",
      mongoose.Schema(
        {
            id: String,
            date: Date,
            findings: Array,
            frames: Array,
            food: Array,
            meekness: Number,
            comment: String,
        },
        { timestamps: true }
      )
    );
    return BeeHiveLog;
  };