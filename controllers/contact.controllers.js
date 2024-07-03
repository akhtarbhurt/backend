import { Contact } from "../models/contact.models.js"

const contactController = async (req, res)=>{
    try {
        const {contactEmail, contactPhone, contactAddress} = req.body
        const payload = await Contact.create({ contactEmail, contactPhone, contactAddress })
        if(!payload) return res.status(400).json({error: "no contact has been found"})
        return res.status(200).json({result: payload})

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error})
    }
}

const getContactController = async (req, res)=>{
    try {
        const payload = await Contact.find()
        if(!payload) return res.status(200).json({error : "nothing has been found"})
        return res.status(200).json(payload)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error})
    }
}

export {
    contactController,
    getContactController
}