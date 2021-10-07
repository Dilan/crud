const router = require('express').Router();
const db = require("../models");
const Employee = db.employee;
const Op = db.Sequelize.Op;

router.get('/', async(req, res) => {
    let items = await Employee.findAll();  // all companies
    return res.status(200).json(items);
});

router.get('/:id', async(req, res) => {
    let item = await Employee.findOne({ where: { id: req.params['id'] } });

    if (!item)
        return res.status(404).json({ message: `Employee ID #${req.params['id']} not found.` });

    return res.status(200).json(item);
});

router.post('/', async(req, res) => {
    let data = req.body;
    let item = await Employee.create(data);

    return res.status(200).json(item);
});

router.put('/:id', async(req, res) => {
    let data = req.body;
    let item = await Employee.update(
        data,
        { where: { id: req.params['id'] }, returning: true }
    );

    return res.status(200).json(item);
});

router.delete('/:id', async(req, res) => {
    let data = req.body;
    let count = await Employee.destroy(
        { where: { id: req.params['id'] } }
    );

    return res.status(200).json({ deleted: count });
});

module.exports = router;
