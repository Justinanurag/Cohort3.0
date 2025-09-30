import type { Response, Request } from "express";
import { Content, Link ,User} from "../models/userModel.js";
import { random } from "../util.js";
import { hash } from "bcryptjs";

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

export const shareLink = async (req: Request, res: Response) => {
  try {
    const share: boolean = Boolean(req.body.share);
    const userId = (req as any).userId; 

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: userId missing",
      });
    }

    if (share) {
      let link = await Link.findOne({ userId });

      if (link) {
        return res.status(200).json({
          success: true,
          hash: link.hash,
          message: "Sharable link already exists",
        });
      }

      const hash = random(20); 
      link = await Link.create({ userId, hash });

      return res.status(201).json({
        success: true,
        hash: link.hash,
        message: "Sharable link generated successfully",
      });

    } else {
      const result = await Link.deleteOne({ userId });

      if (result.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          message: "No link found for this user",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Removed link successfully",
      });
    }

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "error.message",
    });
  }
};

//Get shareLink
export const getShareLink = async (req: Request, res: Response) => {
  try {
    const hash  = req.params.getShareLink; 
   if(!hash){
    return res.json({
      sussess:false,
      message:"Hash are required!!!!!"
    })
   }
    const link = await Link.findOne({ hash });

    if (!link) {
      return res.status(404).json({
        success: false,
        message: "Invalid or expired link",
      });
    }

    const content = await Content.find({ userId: link.userId });

    const user = await User.findById(link.userId).select("-password"); 

    return res.status(200).json({
      success: true,
      message: "Content retrieved successfully",
      user,
      content,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};