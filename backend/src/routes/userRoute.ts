import {Router} from 'express';
const userCtrl = require("../controllers/userController");

const router = Router();

router.post('/create_account/', userCtrl.createUser);

router.route("/:id")
    .get(userCtrl.getUser)
    .delete(userCtrl.removeUser);

router.get("/:id/posts", userCtrl.getPosts);
router.get("/:id/followers", userCtrl.getFollowers);
router.get("/:id/following", userCtrl.getFollowing);

router.get("/user/find", userCtrl.getOne); //for testing

router.patch("/user/update_username", userCtrl.updateUsername);
router.patch("/user/update_password",userCtrl.updatePassword)
router.patch("/user/update_avatar", userCtrl.updateAvatar)
router.patch("/user/remove_avatar",userCtrl.removeAvatar)
router.patch("/user/follow", userCtrl.follow)
router.patch("/user/unfollow", userCtrl.unfollow);


module.exports = router;