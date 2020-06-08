module.exports = mongoose => {
    const Location = mongoose.model(
      "Location",
      mongoose.Schema(
        {
            name: String,
            adress: String,
            longitude : String,
            latitude : String,
            hives: Array,
            comment: String,
            updatedAt: { type: Date, default: Date.now }
        },
        { timestamps: true }
      )
    );
    return Location;
  };