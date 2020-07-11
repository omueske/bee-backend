module.exports = (mongoose) => {
  const queenLinkSchema = mongoose.Schema({
    href: String,
    queenId: String,
    updatetAt: { type: Date, default: Date.now },
  });
  const hiveLogLinkSchema = mongoose.Schema({
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
        queen: [queenLinkSchema],
        sections: Array,
        hiveLog: [hiveLogLinkSchema],
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
