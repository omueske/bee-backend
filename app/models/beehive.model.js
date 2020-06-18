module.exports = (mongoose) => {
  const BeeHive = mongoose.model(
    "BeeHive",
    mongoose.Schema(
      {
        number: Number,
        name: String,
        buildType: String,
        sections: Array,
        hiveLog: Array,
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
