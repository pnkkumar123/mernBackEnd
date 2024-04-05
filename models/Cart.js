import mongoose from 'mongoose';



const cart = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ConsumerSchema',
    required: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity:{
      type:Number,
      integer: true
    },
    productName: {
      type: String,
      
    },
    price: {
      type: Number,
      integer: true
     
    },
    photo: [{
      type: String,
     
    }]
  }]
});

const Cart = mongoose.model("Cart", cart); 

export default Cart;
