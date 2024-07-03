import { Reports } from "../models/reports.models.js"

const reportController = async (req, res)=>{
    try {
        const {companyName, review, userName, warning, warningText} = req.body
        const payload = await Reports.create({companyName, review, userName, warning, warningText})
        if(!payload) return res.status(400).json({result: "no data found in report"})
        return  res.status(200).json({result: payload})
    } catch (error) {
        console.log(error)
        return res.status(200).json({error: error})
    }
}

const getReportController = async (req, res)=>{
    try {
        const payload = Reports.find()
        if(!payload) return res.status(400).json({result: "no data found in reports"})
        return res.status(200).json({result: payload})
    } catch (error) {
        console.log(error)
        return res.status(200).json({error: error})
    }
}

export {reportController, getReportController}