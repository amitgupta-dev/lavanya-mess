const Plan = require('../../models/plan')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('../../utils/asyncHandler')

const createPlan = asyncHandler(async (req, res) => {
    let { name, thumbnail, price, meals, menu } = req.body

    if (!(name && price && meals && menu)) return res.status(400).json({
        success: false,
        message: 'Please fill all the required fields',
    })

    const newPlan = new Plan({
        createdBy: req.user.id,
        name,
        thumbnail,
        price,
        timesADay: meals.length,
        meals,
        menu
    })

    let createdPlan = await newPlan.save()

    console.log(createdPlan)

    return res.status(201).json({
        success: true,
        message: "Plan created successfully",
        Plan: createdPlan
    })
})

module.exports = { createPlan }