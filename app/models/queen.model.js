module.exports = mongoose => {
    const Queen = mongoose.model(
      "Queens",
      mongoose.Schema(
        {
          number: Number,
          hatchYear: Number,
          pedigree: String,
          comment: String,
          updatedAt: { type: Date, default: Date.now }
        },
        { timestamps: true }
      )
    );
  
    return Queen;
  };