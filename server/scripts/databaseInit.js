const Month = require('../models/month')
const Day = require('../models/day')

module.exports = {
    createMonths: async function () {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        months.forEach(async (monthName, index) => {
            const month = new Month({
                MonthName: monthName,
                Month: index + 1,
                Year: 2022,
                Complete: false
            })

            try {
                const newMonth = await month.save()
            } catch (error) {
                console.error(error)
            }
        })
    },

    createDays: async function () {
        const numDays = 
        {
            January: 31,
            February: 28,
            March: 31,
            April: 30,
            May: 31,
            June: 30,
            July: 31,
            August: 31,
            September: 30,
            October: 31,
            November: 30,
            December: 31
        }
        for(const monthName in numDays) {
            const month = await Month.findOne({MonthName: monthName})
            for(let dayNumber = 1; dayNumber <= numDays[monthName]; dayNumber++) {
                const day = new Day ({
                    Day: dayNumber,
                    Month: month.id,
                    Complete: false
                })
                try {
                    await day.save()
                } catch (error) {
                    console.error(error)
                }
            }
        }
    }
}
