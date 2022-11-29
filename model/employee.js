const {Schema,model} = require("mongoose")

const employeeSchema = new Schema({
    name: String,
    Date_of_Joining: String,
    Department: String,
    userId: String
})

const EMPLOYEE = model("employee", employeeSchema)

module.exports = EMPLOYEE;