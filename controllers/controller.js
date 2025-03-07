const Customer = require('../models/model');
const bcrypt = require('bcrypt');
const { generateToken, setCookie } = require('../utils/token');

exports.register = async (req, res) => {
    const { name, phone, address, password } = req.body;

    try {
        const Documents = await Customer.countDocuments();

        let customerId;
        let role = 'customer';
        if (Documents === 0) {
            customerId = String(Documents).padStart(4, "0");
            role = 'admin';
        } else {
            customerId = String(Documents).padStart(4, "0");
        }

        if (!name || !phone || !address || !password) {
            return res.status(400).json({ message: 'please fill all fields' });
        }
        const registerCustomer = await Customer.findOne({ phone });
        if (registerCustomer) {
            return res.status(400).json({ message: 'customer already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newCreate = new Customer({
            customerId: customerId,
            name: name,
            phone: phone,
            address: address,
            role: role,
            password: hashedPassword
        });

        const data = await newCreate.save();
        res.status(201).json({ message: 'Customer Registered Successfully', data });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.login = async (req, res) => {
    const { phone, password } = req.body;
    // console.log(phone, password);

    try {
        if (!phone || !password) {
            return res.status(400).json({ message: 'enter phone and password' });
        }

        const loginCustomer = await Customer.findOne({ phone });
        console.log(loginCustomer);

        if (!loginCustomer) {
            return res.status(400).json({ message: 'You Are Not Registered' });
        }

        const validPassword = await bcrypt.compare(password, loginCustomer.password);
        console.log(validPassword);
        if (!validPassword) {
            return res.status(400).json({ message: 'Password Is Wrong' });
        }
        const token = await generateToken(loginCustomer._id);
        console.log(token);

        setCookie(res, token);
        res.status(200).json({ message: 'login successfully', loginCustomer, token });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'customer logged out successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.getCustomerData = async (req, res) => {
    try {
        const _id = req.customer.id;
        const customerData = await Customer.findById(_id);
        res.status(200).json({ message: 'Customer Are Found', customerData });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getAllCustomersData = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({ message: 'All Customers Found', customers });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.getAllCustomersData = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({ message: 'All Customers Found', customers });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};