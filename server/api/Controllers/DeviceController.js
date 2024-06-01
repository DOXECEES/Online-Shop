
const device = require('./../Database/DeviceRequester');

class DeviceController {
    async getAll(req, res) {
        return device.getDeviceById(req.query.device, (error, results) => {
            if (error) throw error;
            res.json(results);
        });
    }
}

module.exports = new DeviceController();