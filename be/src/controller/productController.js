const { Sequelize } = require("sequelize");
const { ProductModel } = require("../models/product");


const createProduct = async (req,res) =>{
  const  { image, 
    title,
    price,
    brand,
    discount,
    gender} = req.body;
    if(!title || !image || !price || !brand || !discount || !gender ){
        return res.status(400).json({err:"any of title, image, price, brand, discount, gender is missing in req.body"})
    }
    try{
        // Create the product in the database
        const product = await ProductModel.create({
            image,
            title,
            price:Number(price),
            brand,
            discount:Number(discount),
            gender
        });

        // Return the newly created product
        res.status(201).json(product);
    
    }catch(err){
       res.json({err:err.message,status:500}) 
    }
}



const getAllProduct = async (req, res) => {
    console.log("req.params",req.params)
    console.log("req.query",req.query)
    let { page, sortby, val, category, q } = req.query;
    try {
        const limitPerPage = 6;
        let offset = 0;
        let whereClause = {}; // Initialize an empty object for conditions
        
        // Fetch all products initially
        let products = await ProductModel.findAll();

        // Filter by category if specified
        if (category && category.length > 0) {
            if (!Array.isArray(category)) {
                category = [category]; // Ensure category is an array
            }
            whereClause.gender = category;
            products = products.filter(product => category.includes(product.gender));
        }

        // Search query
        if (q) {
            const searchQuery = q.toLowerCase().trim(); // Convert to lowercase and remove whitespaces
            products = products.filter(product => product.title.toLowerCase().includes(searchQuery));
        }

        // Pagination
        const totalPages = Math.ceil(products.length / limitPerPage);

        // Adjust page if necessary
        if (page) {
            page = parseInt(page); // Convert page to integer
            page = page < 1 ? 1 : page; // Ensure page is at least 1
            page = page > totalPages ? totalPages : page; // Ensure page is within valid range
            offset = (page - 1) * limitPerPage;
        }

        // Sorting
        if (sortby === 'price' && (val === 'asc' || val === 'desc')) {
            products.sort((a, b) => {
                const priceA = a.price;
                const priceB = b.price;
                return val === 'asc' ? priceA - priceB : priceB - priceA;
            });
        }

        // Paginate and send response
        const paginatedProducts = products.slice(offset, offset + limitPerPage);
        res.json({ products: paginatedProducts, totalPages: totalPages });
    } catch (err) {
        res.json({ err: err.message, status: 500 });
    }
}




const getSingleProduct = async (req,res) => {
    
        const { id } = req.params;
        try {
            const product = await ProductModel.findByPk(id);
            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }
            res.json(product);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
   

}

const updateProduct = async (req,res) => {
       const { image, title, price, brand, discount, gender } = req.body
        const { id } = req.params;
        try {
           // Find the user by ID
        const product = await ProductModel.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Update the name and email properties
        product.image = image;
        product.title = title;
        product.price = Number(price);
        product.brand = brand;
        product.discount = Number(discount);
        product.gender = gender;

        // Save the changes to the database
        await product.save();

        // Return the updated user in the response
        res.json(product);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
   

}


const deleteProduct = async (req, res) => {
    const { id } = req.params;

    // Check if ID exists
    if (!id) {
        return res.status(400).json({ msg: "id is required in req.params", status: 400 });
    }

    try {
        // Attempt to delete the product by its ID
        const numDeletedRows = await ProductModel.destroy({
            where: {
                id: id
            }
        });

        // Check if product was found and deleted
        if (numDeletedRows > 0) {
            return res.status(200).json({ msg: "Product deleted successfully", status: 200 });
        } else {
            return res.status(404).json({ msg: "Product with the given id not found in the db", status: 404 });
        }
    } catch (err) {
        // Handle errors
        console.error(err);
        return res.status(500).json({ error: err.message, status: 500 });
    }
};


module.exports = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,  
    deleteProduct  
};
