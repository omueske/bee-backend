module.exports = mongoose => {
  const hiveLinkSchema = mongoose.Schema({
    href: String,
    hiveId: String,
    updatetAt: { type: Date, default: Date.now }
  })  
  
  const Location = mongoose.model(
      "Location",
      mongoose.Schema(
        {
            name: String,
            adress: String,
            longitude : String,
            latitude : String,
            hives: [ hiveLinkSchema ],
            comment: String,
            updatedAt: { type: Date, default: Date.now }
        },
        { timestamps: true }
      )
    );
    return Location;
  };