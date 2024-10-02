const distribute = require('../../models/distributors/distribute');

// Add a new distribute record
exports.adddistribute = async (req, res) => {
    try {
        const {
            business_name,
            registation_no,
            situated_place,
            Owner_name,
            email,
            phone_no,
            location // Include location from request body
        } = req.body;

        // Validate location to ensure it includes latitude and longitude
        if (!location || !location.lat || !location.lng) {
            return res.status(400).json({ status: "Error", error: "Location is required with latitude and longitude" });
        }

        // Create a new distribute object
        const newDistribute = new distribute({
            business_name,
            registation_no,
            situated_place,
            Owner_name,
            email,
            phone_no,
            location // Include location here
        });

        await newDistribute.save();
        res.status(201).json({ status: "success", message: "Distribute added successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error adding distribute record", error: err.message });
    }
};


// Retrieve all distribute records
exports.getAlldistribute = async (req, res) => {
    try {
        const distributes = await distribute.find();
        res.json(distributes);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving distribute records", error: err.message });
    }
};

// Retrieve a specific distribute record by ID
exports.getdistributeById = async (req, res) => {
    try {
        const distributeId = req.params.id
        const Distribute = await Distribute_status.findById(distributeId);
        
        if (!Distribute) {
            return res.status(404).json({ status: "distribute not found" });
        }
        
        res.status(200).json({ status: "distribute fetched", Distribute });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving distribute record", error: err.message });
    }
};

// Update a distribute record
exports.updatedistribute = async (req, res) => {
    try {
        const distributeId = req.params.id;
        const { 
            business_name, 
            registation_no, 
            situated_place, 
            Owner_name, 
            email, 
            phone_no, 
            location // Include location from request body
        } = req.body;

        // Validate location to ensure it includes latitude and longitude
        if (location && (!location.lat || !location.lng)) {
            return res.status(400).json({ status: "Error", error: "Location must include latitude and longitude" });
        }

        const updatedistribute = {
            business_name,
            registation_no,
            situated_place,
            Owner_name,
            email,
            phone_no,
            ...(location && { location }) // Include location if it exists
        };

        const updateddistribute = await distribute.findByIdAndUpdate(distributeId, updatedistribute, { new: true });

        if (!updateddistribute) {
            return res.status(404).json({ status: "Error", message: "Distribute not found" });
        }

        res.status(200).json({ status: "Success", message: "Distribute record updated", updateddistribute });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error updating distribute record", error: err.message });
    }
};

// Delete a distribute record
exports.deletedistribute = async (req, res) => {
    try {
        const distributeId = req.params.id;
        await distribute.findByIdAndDelete(distributeId);
        res.status(200).json({ status: "distribute record deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error deleting distribute record", error: err.message });
    }
};
