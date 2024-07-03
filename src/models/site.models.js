import { Schema, model } from "mongoose";

const siteSchema = new Schema({
    siteName: {
        type: String,
        trim: true,
        required: true
    },
    siteLogo: {
        type: String,
        trim: true,
        required: true
    },
    favicons: {
        type: String,
        trim: true,
        required: true
    },
},{
    timestamps: true
})

const SiteConfig = model("site", siteSchema)

export {SiteConfig}