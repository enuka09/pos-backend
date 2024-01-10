const CustomerSchema = require('../model/CustomerSchema');

const create = (req, resp) => {
    const customer = new CustomerSchema({
        name: req.body.name,
        address: req.body.address,
        salary: req.body.salary
    });
    customer.save().then(response => {
        resp.status(201).json({'message': 'Customer Saved!'})
    }).catch(error => {
        return resp.status(500).json(error)
    })
}

const findById = (req, resp) => {
    CustomerSchema.findOne({'_id': req.params.id}).then(selectedObj => {
        if (selectedObj != null) {
            return resp.status(200).json(selectedObj);
        }
        return resp.status(404).json({'message': 'Customer Not Found!'})
    });
}

const update = async (req, resp) => {
    const updateData = await CustomerSchema.findOneAndUpdate({'_id': req.params.id}, {
        $set: {
            name: req.body.name,
            address: req.body.address,
            salary: req.body.salary
        }
    }, {new: true});
    if (updateData) {
        resp.status(200).json({'message': 'Updated!'})
    } else {
        return resp.status(500).json({'message': 'Internal Server Error'});
    }
}

const deleteById = async (req, resp) => {
    const deleteData = await CustomerSchema.findByIdAndDelete({'_id': req.params.id});

    if (deleteData) {
        return resp.status(204).json({'message': 'Deleted!'})
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

        CustomerSchema.find(query)
            .limit(pageSize)
            .skip(skip).then(response => {
            return resp.status(200).json(response);
        });
    } catch (error) {
        return resp.status(500).json({'message': 'Internal Server Error'});
    }
}

const findCount = (req, resp) => {
    try {
        CustomerSchema.countDocuments().then(response => {
            return resp.status(200).json(response);
        })
    } catch (error) {
        return resp.status(500).json({'message': 'Internal Server Error'});
    }
}

module.exports = {
    create, findById, update, deleteById, findAll, findCount
}
