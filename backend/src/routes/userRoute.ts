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
router.get("/:id/closet", userCtrl.getCloset);
router.get("/:id/outfits", userCtrl.getOutfits);
router.post("/login", userCtrl.logIn);

router.patch("/user/update_username", userCtrl.updateUsername);
router.patch("/user/update_password",userCtrl.updatePassword)
router.patch("/user/update_avatar", userCtrl.updateAvatar)
router.patch("/user/remove_avatar",userCtrl.removeAvatar)
router.patch("/user/follow", userCtrl.follow)
router.patch("/user/unfollow", userCtrl.unfollow);
router.patch("/user/add_garment", userCtrl.addToCloset);
router.patch("/user/remove_garment", userCtrl.removeFromCloset);

//for testing
router.get("/user/find", userCtrl.getOne);

/*
    getLikedComments    /////////sredi comment controller
    getAllOutfits 

*/

module.exports = router;