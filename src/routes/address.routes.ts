import express from "express";
import { AddressController } from "../controllers/address.controller";
import { validate } from "../middlewares/validate";
import { createAddressSchema, updateAddressSchema } from "../validations/address.validation";

const router = express.Router();

router.get("/addresses/:userID", AddressController.getAddressByUserId);
router.post("/addresses", validate(createAddressSchema), AddressController.createAddress);
router.patch("/addresses/:userID", validate(updateAddressSchema), AddressController.updateAddress);

export default router;
