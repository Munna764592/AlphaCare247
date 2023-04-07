var User = require('../model/rModel');
const xlsxj = require("xlsx-to-json");

const importUser = async (req, res) => {
    try {
        var userData = [];

        xlsxj().fromFile(req.file.path).then(async (res) => {
            console.log(res);
            for (var x = 0; x < res.length; x++) {
                userData.push({
                    department: res[x].DEPARTMENT,
                    test_type: res[x].TEST_NAME,
                    test_prep: res[x].TEST_PREPARATIONS,
                    price: res[x].PRICE,
                    lab_name: res[x].LAB_NAME,
                    location: res[x].LAB_LOCATION,
                    g_location: res[x].GOOGLE_LOCATION
                })
            }
            await User.insertMany(userData);
        })

        res.send({ status: 400, success: true, msg: "xlsx imported" })
    } catch (error) {
        res.send({ status: 400, success: false, msg: error.message })
    }
}

module.exports = {
    importUser
}