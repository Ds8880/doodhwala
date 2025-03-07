const milkM = require('../models/milkmodel');
const Customer = require('../models/model');

exports.createMilkRecord = async (req, res) => {
    try {
        let { id } = req.params; //0002
        // console.log(id);

        const { milkType, quantity, perLitterPrice = 70 } = req.body;
        const totalPrice = quantity * perLitterPrice;

        const customer = await Customer.findOne({ customerId: id });
        // console.log(customer);
        if (!customer) {
            return res.status(400).json({ message: 'Customer not found' });
        }

        const milkRecord = new milkM({
            customerId: customer.id,
            buyerId: id,
            date: req.body.date || Date.now(),
            milkType,
            quantity,
            perLitterPrice,
            totalPrice,
        });
        console.log(milkRecord);

        const newMilk = await milkRecord.save();
        res.status(201).json({ message: 'Create Successfully', newMilk });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getAllMilkRecord = async (req, res) => {
    try {
        const getMilkData = await milkM.find();
        res.status(200).json({ message: 'Get All Milk Record Successfully', getMilkData });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getMilkRecordByBuyerId = async (req, res) => {
    try {
        let { id } = req.params;
        // console.log(id);

        const customerMilkData = await milkM.find({ buyerId: id });
        console.log(customerMilkData);

        res.status(200).json({ message: 'This Customer Milk Record', customerMilkData });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateCustomerMilkRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const UpdateMilkData = await milkM.findByIdAndUpdate(req.body, { new: true });
        res.status(200).json({ message: 'This Milk Record Updated Successfully', UpdateMilkData });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteCustomerMilkRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteMilkData = await milkM.findByIdAndDelete(id);
        res.status(200).json({ message: 'This Milk Record Deleted Successfully', deleteMilkData });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.summaryMilkRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59, 999);
        const MilkData = await milkM.find({
            date: {
                $gte: startOfMonth,
                $lt: endOfMonth,
            }, buyerId: id
        });
        if (MilkData.length === 0) {
            return res.status(400).json({ message: 'No Record Found' });
        }
        const totalEntries = MilkData.length;

        const totalQuantity = MilkData.reduce((acc, curr) => acc + curr.quantity, 0);

        const avgPrice = (MilkData.reduce((acc, curr) => acc + curr.totalPrice, 0) / totalQuantity).toFixed(2);

        const totalAmount = totalQuantity * avgPrice;
        res.status(200).json({ message: 'Summary Milk Record Found', totalEntries, totalQuantity, avgPrice, totalAmount });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.MonthWiseData = async (req, res) => {
    try {
        const { id } = req.params;
        const { month } = req.query;

        const selectedMonth = parseInt(month);
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        const currentDate = new Date();

        let startOfMonth, endOfMonth;

        // Check if selectedMonth is greater than the current month (future month)
        if (selectedMonth) {
            if (selectedMonth < 1 || selectedMonth > 12) {
                return res.status(400).json({ message: 'Invalid month' });
            }

            // If the selected month is in the future (later than the current month)
            if (selectedMonth > currentMonth) {
                const previousYear = currentYear - 1;
                startOfMonth = new Date(previousYear, selectedMonth - 1, 1);
                endOfMonth = new Date(previousYear, selectedMonth, 0, 23, 59, 59, 999);
            }
        } else {
            // If no month is provided, use the current month
            startOfMonth = new Date(currentYear, currentMonth - 1, 1);
            endOfMonth = new Date(currentYear, currentMonth, 0, 23, 59, 59, 999);
        }

        const MilkData = await milkM.find({
            date: {
                $gte: startOfMonth,
                $lt: endOfMonth,
            },
            buyerId: id
        });

        if (MilkData.length === 0) {
            return res.status(400).json({ message: `No records found for month ${month}.` });
        }

        const totalEntries = MilkData.length;
        const totalQuantity = MilkData.reduce((acc, curr) => acc + curr.quantity, 0);
        const avgPrice = totalQuantity > 0
            ? (MilkData.reduce((acc, curr) => acc + curr.totalPrice, 0) / totalQuantity).toFixed(2)
            : 0;
        const totalAmount = totalQuantity * avgPrice;

        res.status(200).json({ message: 'Monthly Milk Record Found', totalEntries, totalQuantity, avgPrice, totalAmount });

    } catch (error) {
        console.error('Error fetching month-wise data:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
