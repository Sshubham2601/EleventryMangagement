import { Component } from "../models/components.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { v4 as uuidv4 } from "uuid";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import QRCode from "qrcode";

export const create = asyncHandler(async (req, res) => {
  try {
    const { name, dateReceived, quantity } = req.body;

    if (!name || !dateReceived || !quantity) {
      throw new ApiError(400, "all fields are required");
    }
    const record = await Component.create({
      name: name,
      dateReceived: dateReceived,
      numberReceived: quantity,
      balanceItems: quantity,
      qrIdentifier: uuidv4(),
    });

    const qrData = {
      id: record.id,
      name: record.name,
      dateReceived: record.dateReceived,
      numberReceived: record.numberReceived,
      balanceItems: record.balanceItems,
      qrIdentifier: record.qrIdentifier,
    };

    const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));

    const responsePayload = {
      record: record,
      qrCodeBase64: qrCode,
    };

    return res
      .status(201)
      .json(
        new ApiResponse(200, responsePayload, "record created Successfully")
      );
  } catch (error) {
    throw error;
  }
});

export const getAll = asyncHandler(async (req, res) => {
  try {
    const records = await Component.find({});
    const qrCodePromises = records.map(async (record) => {
      const qrData = {
        id: record.id,
        name: record.name,
        dateReceived: record.dateReceived,
        numberReceived: record.numberReceived,
        balanceItems: record.balanceItems,
        qrIdentifier: record.qrIdentifier,
      };

      // Generate QR code as base64
      const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));
      return qrCode;
    });

    // Wait for all QR code promises to resolve
    const qrCodes = await Promise.all(qrCodePromises);

    // Add QR codes to each record
    const recordsWithQRCodes = records.map((record, index) => ({
      ...record._doc, // Assuming Mongoose model, use record.toObject() if needed
      qrCodeBase64: qrCodes[index], // Include base64 QR code in each record
    }));
    return res
      .status(200)
      .json(
        new ApiResponse(200, recordsWithQRCodes, "record fetched successfully")
      );
  } catch (error) {
    throw error;
  }
});

export const dispatchMaterial = asyncHandler(async (req, res) => {
  try {
    const { id, numberReceived } = req.body;
    const component = await Component.findByIdAndUpdate(
      id,
      {
        numberDispatched: numberReceived,
        dateDispatch: new Date(),
        status: "Delivered",
        balanceItems: 0,
      },
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json(new ApiResponse(200, component, "record updated successfully"));
  } catch (error) {
    throw error;
  }
});

export const update = asyncHandler(async (req, res) => {
  try {
    const { name, numberDispatched, dateDispatched } = req.body;
    const id = req.params.id;
    if (!name || !numberDispatched || !dateDispatched) {
      throw new ApiError(400, "all fields are required");
    }
    const component = await Component.findByIdAndUpdate(
      id,
      {
        name: name,
        numberDispatched: numberDispatched,
        dateDispatch: dateDispatched,
      },
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json(new ApiResponse(200, component, "record fetched successfully"));
  } catch (error) {
    throw error;
  }
});

export const get = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const record = await Component.findById(id);
    return res
      .status(200)
      .json(new ApiResponse(200, record, "record fetched successfully"));
  } catch (error) {
    throw error;
  }
});

export const remove = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const record = await Component.findByIdAndDelete(id);
    return res
      .status(200)
      .json(new ApiResponse(200, record, "record removed successfully"));
  } catch (error) {
    throw error;
  }
});
