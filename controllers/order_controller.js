const mongoose = require('mongoose');
const ordermodel = require('../Models/ordermodal');

const addorder = async (req, res) => {
  try {
    const userid = req.params.id;
    const { products, paymentmode } = req.body;

    if (!userid) {
      return res.status(400).json({ status: false, data: { message: 'User Id is null' } });
    }

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ status: false, data: { message: 'Products array is invalid or empty' } });
    }

    // Prepare products with proper ObjectIds
    const formattedProducts = products.map(item => {
      const [productId, sizeId] = item.product.split('-');

      if (!mongoose.Types.ObjectId.isValid(productId) || !mongoose.Types.ObjectId.isValid(sizeId)) {
        throw new Error('Invalid product or size ID');
      }

      return {
        product: new mongoose.Types.ObjectId(productId),
        size: new mongoose.Types.ObjectId(sizeId),
        quantity: item.quantity,
        price: item.price
      };
    });

    // Create new order
    const newOrder = new ordermodel({
      user: new mongoose.Types.ObjectId(userid),
      products: formattedProducts,
      paymentmode,
      status: 'pending'
    });

    // Save to database
    const savedOrder = await newOrder.save();

    return res.status(200).json({
      status: true,
      data: {
        message: 'Order placed successfully',
        order: savedOrder
      }
    });

  } catch (error) {
    console.error('Order creation error:', error.message);
    return res.status(500).json({
      status: false,
      data: { message: 'Internal Server Error', error: error.message }
    });
  }
};

module.exports = { addorder };
