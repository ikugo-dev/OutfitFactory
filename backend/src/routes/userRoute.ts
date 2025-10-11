import { Router } from "express";
const userCtrl = require("../controllers/userController");

const router = Router();

router.post("/create_account/", userCtrl.createUser);

router.get("/by_username/:username", userCtrl.getUserByUsername);
router.route("/:id")
    .get(userCtrl.getUser)
    .delete(userCtrl.removeUser);

router.get("/:id/posts", userCtrl.getPosts);
router.get("/:id/followers", userCtrl.getFollowers);
router.get("/:id/following", userCtrl.getFollowing);
router.get("/:id/closet", userCtrl.getCloset);
router.get("/:id/outfits", userCtrl.getOutfits);
router.post("/login", userCtrl.logIn);

router.patch("/update_username", userCtrl.updateUsername);
router.patch("/update_password", userCtrl.updatePassword);
router.patch("/update_avatar", userCtrl.updateAvatar);
router.patch("/remove_avatar", userCtrl.removeAvatar);
router.patch("/follow", userCtrl.follow);
router.patch("/unfollow", userCtrl.unfollow);
router.patch("/add_garment", userCtrl.addToCloset);
router.patch("/remove_garment", userCtrl.removeFromCloset);

//for testing
router.get("/find", userCtrl.getOne);

/*
    getLikedComments    /////////sredi comment controller
    getAllOutfits

*/

module.exports = router;
