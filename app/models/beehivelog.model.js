  module.exports = mongoose => {
    const BeeHiveLog = mongoose.model(
      "BeeHiveLog",
      mongoose.Schema(
        {
          date: Date,
          weather: Array,
          findings: Array,
          frames: Array,
          food: Array,
          meekness: Number,
          comment: String,
          hiveId: String,
          updatedAt: { type: Date, default: Date.now }
        },
        { timestamps: true }
      )
    );
    return BeeHiveLog;
  };