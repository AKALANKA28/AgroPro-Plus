const stock = require('../../models/distributors/stock');

// Add a new stock record
exports.addstock = async (req, res) => {
    try {
        const {ferti_name, amount, price,description,availability} = req.body;

        const newStock = new stock({
            ferti_name,
            amount,
            price,
            description,
            availability,
        });

        await newStock.save();
        res.json("stock Added");
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error adding stock record", error: err.message });
    }
};

// Retrieve all stock records
exports.getAllstock = async (req, res) => {
    try {
        const stocks = await stock.find();
        res.json(stocks);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving stock records", error: err.message });
    }
};

// Retrieve a specific stock record by ID
exports.getstockById = async (req, res) => {
    try {
        const stockId = req.params.id
        const Stock = await stock_status.findById(stockId);
        
        if (!Stock) {
            return res.status(404).json({ status: "stock not found" });
        }
        
        res.status(200).json({ status: "stock fetched", Stock });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving stock record", error: err.message });
    }
};

// Update a stock record
exports.updatestock = async (req, res) => {
    try {
        const stockId = req.params.id;
        const {ferti_name, amount, price,description,availability} = req.body;

        const updatestock = {
            ferti_name,
            amount,
            price,
            description,
            availability,
        };

        const updatedstock = await stock.findByIdAndUpdate(stockId, updatestock, { new: true });

        if (!updatedstock) {
            return res.status(404).json({ status: "stock not found" });
        }

        res.status(200).json({ status: "stock record updated", updatedstock });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error updating stock record", error: err.message });
    }
};

// Delete a stock record
exports.deletestock = async (req, res) => {
    try {
        const stockId = req.params.id;
        await stock.findByIdAndDelete(stockId);
        res.status(200).json({ status: "stock record deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error deleting stock record", error: err.message });
    }
};
