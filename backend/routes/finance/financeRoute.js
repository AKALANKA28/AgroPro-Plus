const express = require('express');
const router = express.Router();
const financeController = require('../../controllers/finance/financeController');

// Add a new process record
router.post("/add", financeController.addBudgetPlan);

// Retrieve all process records
router.get("/", financeController.getAllBudgetPlans);

// Retrieve a specific process record by ID
router.get("/get/:id", financeController.getBudgetPlanById);

// Update a process record
router.patch("/update/:id", financeController.updateBudgetPlan);

// Delete a process record
router.delete("/delete/:id", financeController.deleteBudgetPlan);

module.exports = router;
