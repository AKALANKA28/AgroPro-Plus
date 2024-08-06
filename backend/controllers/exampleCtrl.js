const Example = require('../models/example');

// Get all examples
exports.getExamples = (req, res) => {
  Example.find()
    .then(examples => {
      res.status(200).json(examples);
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};

// Get example by id
exports.getExampleById = (req, res) => {
  Example.findById(req.params.id)
    .then(example => {
      if (example) {
        res.status(200).json(example);
      } else {
        res.status(404).json({ message: 'Example not found' });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};

// Create an example
exports.createExample = (req, res) => {
  const example = new Example({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
  });

  example
    .save()
    .then(() => {
      res.status(201).json({ message: 'Example created successfully' });
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};

// Update an example
exports.updateExample = (req, res) => {
  Example.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(example => {
      if (example) {
        res.status(200).json({ message: 'Example updated successfully', example: example });
      } else {
        res.status(404).json({ message: 'Example not found' });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};

// Delete an example
exports.deleteExample = (req, res) => {
  Example.findByIdAndRemove(req.params.id)
    .then(example => {
      if (example) {
        res.status(200).json({ message: 'Example deleted successfully' });
      } else {
        res.status(404).json({ message: 'Example not found' });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
};
