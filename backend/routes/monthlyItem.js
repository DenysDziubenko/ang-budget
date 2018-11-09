const express = require('express');
const router = express.Router();
const MonthlyItem = require('../models/monthlyItem');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.use('/',  (req, res, next) => {
  jwt.verify(req.headers.token, 'secret',  (error, /*decoded*/) => {
    if (error) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error
      });
    }
    next();
  })
});

router.get("/", (req, res) => {
  const decoded = jwt.decode(req.headers.token);
  let startDateTime = Date.parse(req.headers['startdatetime']);
  let endDateTime = Date.parse(req.headers['enddatetime']);
  MonthlyItem.find({},(error, monthlyItems) => {
    if (error) {
      return res.status(500).json({
        title: 'An error occurred',
        error
      });
    }

    monthlyItems = monthlyItems.filter( monthlyItem =>{
      let inRange = true;
      if(!isNaN(startDateTime) && !isNaN(endDateTime)){
        const date = Date.parse(monthlyItem.dueDate);
        inRange = date >= startDateTime && date <= endDateTime;
      }
      return inRange && (monthlyItem.user.toString() === decoded.user._id);
    });

    res.status(200).json(monthlyItems);
  });
});

router.get("/:id", (req, res) => {
  const decoded = jwt.decode(req.headers.token);
  MonthlyItem.findById(req.params.id, (error, foundMonthlyItem) => {
    if (error) {
      return res.status(500).json({
        title: 'An error occurred',
        error
      });
    }
    if (foundMonthlyItem.user.toString() !== decoded.user._id) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: {message: 'Users do not match'}
      });
    }
    if (!foundMonthlyItem) {
      return res.status(500).json({
        title: 'No Monthly Item Found!',
        error: {message: 'Monthly Item not found'}
      });
    }
    res.status(200).json(foundMonthlyItem);
  });
});

router.post("/", (req, res) => {
  const decoded = jwt.decode(req.headers.token);
  User.findById(decoded.user._id, (error, user) => {
    if (error) {
      return res.status(500).json({
        title: 'An error occurred',
        error
      });
    }

    const monthlyItem = new MonthlyItem({
      name:req.body.name,
      dueDate:req.body.dueDate,
      amount:req.body.amount,
      type:req.body.type,
      description:req.body.description,
      user: user
    });

    monthlyItem.save((error, result) => {
      if (error) {
        return res.status(500).json({
          title: 'An error occurred',
          error
        });
      }
      res.status(201).json(result);
      user.monthlyItems.push(result);
      user.save();
    });
  });
});

router.put("/", (req, res) => {
  const decoded = jwt.decode(req.headers.token);
  MonthlyItem.findById(req.body._id, (error, monthlyItem)=> {
    if (error) {
      return res.status(500).json({
        title: 'An error occurred',
        error
      });
    }
    if (monthlyItem.user.toString() !== decoded.user._id) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: {message: 'Users do not match'}
      });
    }
    if (!monthlyItem) {
      return res.status(500).json({
        title: 'No Monthly Item Found!',
        error: {message: 'Monthly Item not found'}
      });
    }

    monthlyItem.name = req.body.name;
    monthlyItem.dueDate = req.body.dueDate;
    monthlyItem.amount = req.body.amount;
    monthlyItem.description = req.body.description;

    monthlyItem.save((error, result) => {
      if (error) {
        return res.status(500).json({
          title: 'An error occurred',
          error
        });
      }
      res.status(200).json(result);
    });
  });
});

router.delete("/:id", (req, res) => {
  const decoded = jwt.decode(req.headers.token);
  MonthlyItem.findById(req.params.id, (error, monthlyItem) => {
    if (error) {
      return res.status(500).json({
        title: 'An error occurred',
        error
      });
    }
    if (monthlyItem.user.toString() !== decoded.user._id) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: {message: 'Users do not match'}
      });
    }
    if (!monthlyItem) {
      return res.status(500).json({
        title: 'No Monthly Item Found!',
        error: {message: 'Monthly Item not found'}
      });
    }
    monthlyItem.remove((error, result) => {
      if (error) {
        return res.status(500).json({
          title: 'An error occurred',
          error
        });
      }
      res.status(200).json(result);
    });
  });

});

module.exports = router;
