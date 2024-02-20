const mongoose = require('mongoose')

const DayRoutineSchema = new mongoose.Schema({
    breakfast: String,
    lunch: String,
    dinner: String
})

const MenuSchema = new mongoose.Schema({
    Monday: DayRoutineSchema,
    Tuesday: DayRoutineSchema,
    Wednesday: DayRoutineSchema,
    Thursday: DayRoutineSchema,
    Friday: DayRoutineSchema,
    Saturday: DayRoutineSchema,
    Sunday: DayRoutineSchema
}, { timestamps: true })

const Menu = mongoose.models.Menu || mongoose.model('Menu', MenuSchema)

module.exports = Menu