import type { Response, Request } from "express";
import { Content } from "../models/userModel.js";

export const content = async (req: Request, res: Response) => {
  const { link, type } = req.body;

  try {
    await Content.create({
      link,
      type,
      //@ts-ignore
      userId: req.userId,
      tags: [],
    });
    return res.json({
      message: "Content Added",
    });
  } catch (error: any) {
    return res.status(402).json({
      success: false,
      message: error.message,
    });
  }
};
//getContent
export const getContent = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const content = await Content.find({ userId }).populate("userId", "name");
    return res.status(200).json({
      success: true,
      content,
    });
  } catch (error) {
    console.error("Error fetching content:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

//delete Content

export const delContent = async (req: Request, res: Response) => {
  const contentId = req.body.contentId;
  try {
    await Content.deleteMany({
      contentId,
      //@ts-ignore
      userId: req.userId,
    });
    return res.json({
      success: true,
      message: "Deleted Successfully!!!",
    });
  } catch (error: any) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
