import { Router } from "express";
import {
  addExpense,
  deleteExpense,
  editExpense,
  groupCategoryExpense,
  groupDailyExpense,
  groupMonthlyExpense,
  recentUserExpense,
  userCategoryExpense,
  userDailyExpense,
  userMonthlyExpense,
  viewExpense,
  viewGroupExpense,
  viewUserExpense,
} from "../../../controllers/apps/expense-split-app/expense.controller.js";
import { addAExpenseValidator } from "../../../validators/apps/expense-split-app/expense.validator.js";
import { validate } from "../../../validators/validate.js";
import { mongoIdPathVariableValidator } from "../../../validators/common/mongodb.validators.js";
import { verifyJWT } from "../../../middlewares/auth.middlewares.js";
import { upload } from "../../../middlewares/multer.middlewares.js";
const router = Router();
//all routes are secured routes
router.use(verifyJWT);

//Creates a new expense accepts bill photos also
router
  .route("/addexpense/:groupId")
  .post(
    upload.fields([{ name: "billAttachments", maxCount: 5 }]),
    mongoIdPathVariableValidator("groupId"),
    addAExpenseValidator(),
    validate,
    addExpense
  );
router
  .route("/:expenseId")
  .get(mongoIdPathVariableValidator("expenseId"), validate, viewExpense) // gets expense details
  .patch(mongoIdPathVariableValidator("expenseId"), validate, editExpense) //edit expense details not the bills
  .delete(mongoIdPathVariableValidator("expenseId"), validate, deleteExpense); //Deletes expenses

router
  .route("/group/:groupId")
  .get(mongoIdPathVariableValidator("groupId"), validate, viewGroupExpense); //shows all the expense in a group

router.route("/user/expense").get(viewUserExpense); //View all the expense of the user

router.route("/user/recentexpense").get(recentUserExpense); //Gives top 5 recent user expenses
router.route("monthlyexpense/user").get(userMonthlyExpense); //Sorts all the expenses of user month wise and displays recent first

router.route("/categoryexp/user").get(userCategoryExpense); //shows all user expenses category wise
router.route("/dailyexpense/user").get(userDailyExpense); //Shows the daily expense of user of that day

router
  .route("/monthlyexpense/group/:groupId")
  .get(mongoIdPathVariableValidator("groupId"), validate, groupMonthlyExpense); //Shows all the expense in a group month wise

router
  .route("/dailyexpense/group/:groupId")
  .get(mongoIdPathVariableValidator("groupId"), validate, groupDailyExpense); //Shows all the expense in a group daily
router
  .route("/categoryexpense/group/:groupId")
  .get(mongoIdPathVariableValidator("groupId"), validate, groupCategoryExpense); //Shows all the expense in a group category wise

export default router;
