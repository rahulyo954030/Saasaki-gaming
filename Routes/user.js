
const {Router} = require("express")
const EMPLOYEE = require("../model/employee")

const userRouter =Router()

userRouter.post("/:userid/employee", (req,res)=>{
    const {userid }=req.params
  const {name,Date_of_Joining,Department} = req.body
    const employee = new EMPLOYEE({
        name,
        Date_of_Joining,
        Department,
        userId : userid
    })
    employee.save((err,success)=>{
        try{
        return res.status(200).send({message: "Employee Added", employee : success["_doc"]})
        }
        catch(err){
            return res.status(500).send({message: "Error Occurred"})
        }   
    })
})

userRouter.get("/:userid/employee", async(req,res)=>{
    const {userid} = req.params;
    const employee = await  EMPLOYEE.find({userId:userid})
    res.send(employee)
})

userRouter.delete("/:userid/employee/:employeeId", async(req, res) => {
    const userid = req.params.userid
    const EmployeeID = req.params.employeeId
    const product = await EMPLOYEE.deleteOne({_id: EmployeeID, userid: userid})
                    .then(result => {
                        return res.status(201).send({message: "Deleted Successfully"})
                    })
                    .catch(err => {
                        return res.status(401).send({message: "Something went wrong"})
                    })
})


userRouter.patch("/:userid/employee/:employeeId", async(req, res) => {
    const {userid} = req.params
    const {employeeId} = req.params
    const Employee = await EMPLOYEE.findOne({_id:employeeId})

    if(Employee.userId == userid){
        let updateOne = await EMPLOYEE.findByIdAndUpdate({_id:employeeId},req.body,{new : true})
        return res.send({message: "update successfully", updateOne})
    }
    else{
        return res.send({message: "something went wrong"})
    }
   
})


module.exports = userRouter;