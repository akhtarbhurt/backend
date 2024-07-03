import express, { Router } from "express";
import { siteControllers, updateSiteControllers } from "../controllers/site.controllers.js";
import { siteUpload } from "../middleware/siteMulter.middleware.js"; // New middleware for site config

const router = Router();

router.post('/site', siteUpload.fields([
    { name: 'siteLogo', maxCount: 1 },
    { name: 'favicons', maxCount: 1 }
  ]), siteControllers);
  router.put('/site/:id', siteUpload.fields([{ name: 'siteLogo', maxCount: 1 }, { name: 'favicons', maxCount: 1 }]), updateSiteControllers);

export default router;
