import {Router} from 'express';
import { follow } from '../controllers/userController.js';
const {userCtrl} = require("../controllers/userController.ts");

const router = Router();

router.post("/create_account", userCtrl.createUser);

router.delete("/delete_account", userCtrl.removeUser);

router.get("/user/:id", userCtrl.getUser);
router.get("/user/posts", userCtrl.getPosts);
router.route("/user")
    .patch(userCtrl.updateUsername)
    //.patch(userCtrl.updatePassword)
    .patch(userCtrl.changeAvatar)
    .patch(userCtrl.removeAvatar)
    .patch(userCtrl.follow)
    .patch(userCtrl.unfollow);