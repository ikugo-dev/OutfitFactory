import { Router } from "express";
import * as postCtrl from "../controllers/postController.ts";

const router = Router();

router.route("/post/:id")
    .patch(postCtrl.like)
    .patch(postCtrl.unlike)
    .patch(postCtrl.addComment)
    .patch(postCtrl.removeComment)
    .patch(postCtrl.addGrade)
    .get(postCtrl.getPost)
    .delete(postCtrl.deletePost);

router.post("/create_post", postCtrl.createPost);
router.route("/edit_post")
    .patch(postCtrl.publish)
    .patch(postCtrl.unpublish);

export default router;
