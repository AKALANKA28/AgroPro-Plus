const FertilizerData = require("../../models/ML/fertilizerDataModel");

// Add new data
exports.addData = async (req, res) => {
    try {
      const newData = new FertilizerData(req.body);
      await newData.save();
      res.status(201).send('Data added successfully');
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
  // Get all data
  exports.getData = async (req, res) => {
    try {
      const data = await FertilizerData.find();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
  // Update data by ID
  exports.updateData = async (req, res) => {
    try {
      await FertilizerData.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).send('Data updated successfully');
    } catch (error) {
      res.status(400).send(error);
    }
  };