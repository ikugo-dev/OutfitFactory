import { Router } from "express";
const postCtrl = require("../controllers/postController");
const outfitCtrl = require("../controllers/outfitController");
const gradeCtrl = require("../controllers/gradeController");
const garmentCtrl = require("../controllers/garmentController");
const commentCtrl = require("../controllers/commentController");

const router = Router();

router.patch("/post/add_comment", postCtrl.addComment);
router.patch("/post/like", postCtrl.like);
router.patch("/post/unlike", postCtrl.unlike); //treba li mi
router.patch("/post/add_grade", postCtrl.addGrade);
router.post("/post/create_post", postCtrl.createPost);
router.get("/post/:id", postCtrl.getPost);
router.get("/posts", postCtrl.getPosts);
router.delete("/post/:id", postCtrl.deletePost);

//grade routes
router.get("/grade/:id", gradeCtrl.getGrade);
router.post("/create_grade", gradeCtrl.createGrade);
router.patch("/grade/add_fit", gradeCtrl.addFit);
router.patch("/grade/add_material", gradeCtrl.addMaterial);
router.patch("/grade/add_design", gradeCtrl.addDesign);
router.patch("/grade/add_comfort", gradeCtrl.addComfort);
router.delete("/grade/:id", gradeCtrl.deleteGrade);

//outfit routes
router.post("/create_outfit", outfitCtrl.createOutfit);
router.patch("/outfit/add_garment", outfitCtrl.addGarment);
router.get("/outfit/:id", outfitCtrl.getOutfit);
router.delete("/outfit/:id", outfitCtrl.deleteOutfit);

//garment routes
router.get("/garment/:id", garmentCtrl.getGarment);
router.get("/garments", garmentCtrl.getGarments);
router.post("/create_garment", garmentCtrl.createGarment);
router.patch("/garment/add_image", garmentCtrl.addImage);
router.patch("/garment/add_color", garmentCtrl.addColor);
router.patch("/garment/add_material", garmentCtrl.addMaterial);
router.patch("/garment/add_gender", garmentCtrl.addGender);
router.delete("/garment/:id", garmentCtrl.deleteGarment);

//comment routes
router.get("/comment/:id", commentCtrl.getComment);
router.post("/create_comment", commentCtrl.createComment);
router.patch("/comment/like", commentCtrl.likeComment);
router.patch("/comment/unlike", commentCtrl.unlikeComment);
router.delete("/comment/:id", commentCtrl.deleteComment);

/*
fale:




*/

module.exports = router;
