import {Router} from 'express';
import * as userCtrl from "../controllers/userController.ts";

const router = Router();

router.post("/create_account", userCtrl.createUser);

router.route("/user/:id")
    .get(userCtrl.getUser)
    .delete(userCtrl.removeUser);

router.get("/user/posts", userCtrl.getPosts);

router.route("/user")
    .patch(userCtrl.updateUsername)
    .patch(userCtrl.updatePassword)
    .patch(userCtrl.updateAvatar)
    .patch(userCtrl.removeAvatar)
    .patch(userCtrl.follow)
    .patch(userCtrl.unfollow);


export default router;