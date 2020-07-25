module.exports = (mongoose) => {
  const queenSchema = mongoose.Schema({
    number: Number,
    hatchYear: Number,
    pedigree: String,
    race: String,
    comment: String,
    updatedAt: { type: Date, default: Date.now },
  });
  const logSchema = mongoose.Schema({
    href: String,
    hiveLogId: String,
    updatetAt: { type: Date, default: Date.now },
  });

  const BeeHive = mongoose.model(
    "BeeHive",
    mongoose.Schema(
      {
        number: Number,
        name: String,
        buildType: String,
        queen: [queenSchema],
        sections: Array,
        hiveLog: [logSchema],
        todos: Array,
        comment: String,
        status: String,
        updatedAt: { type: Date, default: Date.now },
      },
      { timestamps: true }
    )
  );
  return BeeHive;
};
