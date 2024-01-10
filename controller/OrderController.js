const {query} = require('express');
const CustomerSchema = require('../model/CustomerSchema');
const OrderSchema = require('../model/OrderSchema');

const create = (req, resp) => {
    const order = new OrderSchema({
        date: req.body.date,
        customerDetails: req.body.customerDetails,
        totalCost: req.body.totalCost,
        products: req.body.products
    });
    order.save().then(response => {
        resp.status(201).json({'message': 'Order Saved!'});
    }).catch(error => {
        return resp.status(500).json(error)
    })
}

const findById = (req, resp) => {
    OrderSchema.findOne({'_id': req.params.id}).then(selectedObj => {
        if (selectedObj != null) {
            return resp.status(200).json({'data': selectedObj});
        }
        return resp.status(404).json({'message': 'Order Not Found!'})
    });
}

const update = async (req, resp) => {
    const updateData = await OrderSchema.findOneAndUpdate({'_id': req.params.id}, {
        $set: {
            date: req.body.date,
            customerDetails: req.body.customerDetails,
            totalCost: req.body.totalCost,
            products: req.body.products
        }
    }, {new: true});
    if (updateData) {
        resp.status(200).json({'message': 'Updated!'})
    } else {
        return resp.status(500).json({'message': 'Internal Server Error'});
    }
}

const deleteById = async (req, resp) => {
    const deleteData = await OrderSchema.findOneAndDelete({'_id': req.params.id});

    if (deletedData) {
        resp.status(204).json({'message': 'Deleted!'})
    } else {
        return resp.status(500).json({'message': 'Internal Server Error'});
    }
}

const findAll = (req, resp) => {
    try {
        const {searchText, page = 1, size = 10} = req.query;

        const pageNumber = parseInt(page);
        const pageSize = parseInt(size);

        const query = {};
        if (searchText) {
            query.$text = {$search: searchText}
        }

        const skip = (pageNumber - 1) * pageSize;

        OrderSchema.find(query)
            .limit(pageSize)
            .skip(skip).then(response => {
            return resp.status(200).json(response);
        })
    } catch (error) {
        return resp.status(500).json({'message': 'Internal Server Error'});
    }
}

const findAllIncome = async (req, resp) => {
    try {
        const result = await OrderSchema.aggregate([
            {
                $group: {
                    _id: null,
                    totalCostSum: {$sum: '$totalCost'}
                }
            }
        ]);
        const totalCostSum = result.length > 0 ? result[0].totalCostSum : 0;
        return resp.json({totalCostSum});
    } catch (error) {
        return resp.status(500).json({message: 'Internal Server Error'});
    }
};

const findCount = (req, resp) => {
    try {
        OrderSchema.countDocuments().then(response => {
            return resp.status(200).json(response);
        })
    } catch (error) {
        return resp.status(500).json({'message': 'Internal Server Error'});
    }
}


module.exports = {
    create, findById, update, deleteById, findAll, findCount, findAllIncome
}
