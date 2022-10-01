const { Router } = require("express");
const randomUserData = require("../controller/randomUserData.controller");
const router = Router();

router.route("/save").post(randomUserData.saveUserDataController)
router.route("/all").get(randomUserData.getAllUsers)
router.route("/random").get(randomUserData.getRandomUser)
router.route("/update/:id").patch(randomUserData.updateUserById)
router.route("/update-bulk").patch(randomUserData.updateMultipleUser)
router.route("/delete/:id").delete(randomUserData.deleteUser);

module.exports = router;
