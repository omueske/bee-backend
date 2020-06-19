exports.showColor = (req, res) => {
  const logger = require("../config/log4js");

  if (!req.params.year) {
    logger.error("HTTP-400: 'year' cannot be empty");
    res.status(400).send({ message: "year cannot be empty" });
  } else {
    let result = req.params.year % 5;
    let yearColor;

    logger.info("yearColor called. Year: " + req.params.year);
    switch (result) {
      case 0:
        yearColor = "blue";
        break;
      case 1:
        yearColor = "white";
        break;
      case 2:
        yearColor = "yellow";
        break;
      case 3:
        yearColor = "red";
        break;
      case 4:
        yearColor = "green";
        break;
    }
    logger.info("Calculated Color: " + yearColor);

    logger.info("HTTP-200: Year Color calculated");
    return res.status(200).send({
      success: "true",
      message: "Color calculated successfully",
      yearColor,
    });
  }
};
