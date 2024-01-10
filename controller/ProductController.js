const ProductSchema = require('../model/ProductSchema');

const create = (req, resp) => {
    const product = new ProductSchema({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        unitPrice: req.body.unitPrice,
        qtyOnHand: req.body.qtyOnHand
    });
    product.save().then(response => {
        resp.status(201).json({'message': 'Product Saved!'})
    }).catch(error => {
        return resp.status(500).json(error)
    })
}

const findById = (req, resp) => {
    ProductSchema.findOne({'_id': req.params.id}).then(selectedObj => {
        if (selectedObj != null) {
            return resp.status(200).json(selectedObj);
        }
        return resp.status(404).json({'message': 'Product Not Found!'})
    });

}

const update = async (req, resp) => {
    const updateData = await ProductSchema.findOneAndUpdate({'_id': req.params.id}, {
        $set: {
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            unitPrice: req.body.unitPrice,
            qtyOnHand: req.body.qtyOnHand
        }
    }, {new: true});
    if (updateData) {
        resp.status(200).json({'message': 'Updated!'})
    } else {
        return resp.status(500).json({'message': 'Internal Server Error'});
    }
}

const deleteById = async (req, resp) => {
    const deleteData = await ProductSchema.findByIdAndDelete({'_id': req.params.id});

    if (deleteData) {
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

        ProductSchema.find(query)
            .limit(pageSize)
            .skip(skip).then(response => {
            return resp.status(200).json(response);
        })
    } catch (error) {
        return resp.status(500).json({'message': 'Internal Server Error'});
    }
}

const findAllMin = (req, resp) => {
    try {
        ProductSchema.find({qtyOnHand:{$lt:10}}).then(response => {
            return resp.status(200).json(response);
        })
    } catch (error) {
        return resp.status(500).json({'message': 'Internal Server Error'});
    }
}

const findCount = (req, resp) => {
    try {
        ProductSchema.countDocuments().then(response => {
            return resp.status(200).json(response);
        })
    } catch (error) {
        return resp.status(500).json({'message': 'Internal Server Error'});
    }
}

module.exports = {
    create, findById, update, deleteById, findAll, findAllMin, findCount
}
