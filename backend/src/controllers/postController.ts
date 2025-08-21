import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { PostModel } from "../models/post.ts";
import { UserModel } from "../models/user.ts";
import { Types } from "mongoose";

async function getPostOr404(id: string) {
    if (!Types.ObjectId.isValid(id)) {
        throw { status: 400, message: "Invalid post ID." };
    }
    const post = await PostModel.findById(id).exec();
    if (!post) {
        throw { status: 404, message: "Post not found." };
    }
    return post;
}

export const getPost = asyncHandler(async (req: Request, res: Response) => {
    const { ID } = req.body;
    const post = await getPostOr404(ID);
    res.json(post);
});

export const createPost = asyncHandler(async (req: Request, res: Response) => {
    const { Username, Text, Outfit } = req.body;

    const user = await UserModel.findOne({ username: Username }).exec();
    if (!user) {
        throw { status: 404, message: "No such user." };
    }

    if (Text && Text.length > 128) {
        throw { status: 400, message: "Text too long." };
    }

    if (!Outfit?.top || !Outfit?.bottom || !Outfit?.shoes) {
        throw {
            status: 400,
            message: "Outfit requires top, bottom, and shoes.",
        };
    }

    const post = await PostModel.create({
        user: user._id,
        text: Text,
        outfit: Outfit,
        published: false,
    });

    res.status(201).json(post);
});

export const like = asyncHandler(async (req: Request, res: Response) => {
    const { ID } = req.body;
    const post = await getPostOr404(ID);

    post.likes++;
    await post.save();

    res.json({ likes: post.likes });
});

export const unlike = asyncHandler(async (req: Request, res: Response) => {
    const { ID } = req.body;
    const post = await getPostOr404(ID);

    post.likes = Math.max(0, post.likes - 1);
    await post.save();

    res.json({ likes: post.likes });
});

export const addComment = asyncHandler(async (req: Request, res: Response) => {
    const { ID, Comment } = req.body;
    const post = await getPostOr404(ID);

    post.comments.push(Comment);
    await post.save();

    res.json(post);
});

export const addGrade = asyncHandler(async (req: Request, res: Response) => {
    const { ID, Grade } = req.body;
    const post = await getPostOr404(ID);

    post.grades.push(Grade);
    await post.save();

    res.json(post);
});

export const publish = asyncHandler(async (req: Request, res: Response) => {
    const { ID } = req.body;
    const post = await getPostOr404(ID);

    if (post.published) {
        throw { status: 400, message: "Post already published." };
    }

    post.published = true;
    await post.save();

    res.json(post);
});

export const unpublish = asyncHandler(async (req: Request, res: Response) => {
    const { ID } = req.body;
    const post = await getPostOr404(ID);

    if (!post.published) {
        throw { status: 400, message: "Post already private." };
    }

    post.published = false;
    await post.save();

    res.json(post);
});

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
    const { ID } = req.body;
    const post = await getPostOr404(ID);

    await post.deleteOne();
    res.status(204).send();
});
