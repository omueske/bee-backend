
class HelperController {
    async getYearColor(req, res) {
        let result = req.params.year % 5;
        let yearColor;
        
        switch(result) {
            case 0: 
                yearColor = "blue"
                break;
            case 1:
                yearColor = "white"
                break;
            case 2:
                yearColor = "yellow"
                break;
            case 3:
                yearColor = "red"
                break;
            case 4:
                yearColor = "green"
                break;
        }
        return res.status(200).send({
            success: 'true',
            message: 'Color calculated successfully',
            yearColor
        });
    }
}

const helperController = new HelperController
export default helperController;