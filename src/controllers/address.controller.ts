import { Request, Response } from "express";
import { AddressRepository } from "../repositories/address.repository";

export class AddressController {
  static async getAddressByUserId(req: Request, res: Response) {
    try {
      const { userID } = req.params;
      const address = await AddressRepository.getByUserId(Number(userID));

      if (!address) {
        res.status(404).json({ message: "Address not found" });
        return;
      }
      res.json(address);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch address", error: error.message });
    }
  }

  static async createAddress(req: Request, res: Response) {
    try {
      const { userId, street, city, state, zipCode } = req.body;

      const existingAddress = await AddressRepository.getByUserId(userId);
      if (existingAddress) {
        res.status(409).json({ message: "User already has an address" });
        return
      }

      const newAddress = await AddressRepository.create({ user_id: userId, street, city, state, zip_code: zipCode });
      res.status(201).json(newAddress);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to create address", error: error.message });
    }
  }

  static async updateAddress(req: Request, res: Response) {
    try {
      const { userID } = req.params;
      const { street, city, state, zipCode } = req.body;

      const updatedRows = await AddressRepository.update(Number(userID), { street, city, state, zip_code: zipCode });
      if (updatedRows === 0) {
       res.status(404).json({ message: "Address not found" });
       return;
      };

      res.json({ message: "Address updated successfully" });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to update address", error: error.message });
    }
  }
}
