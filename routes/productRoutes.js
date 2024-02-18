const express = require('express')
const router = express.Router()

const { createProduct } = require('../controllers/product/createProduct')
const { getProducts } = require('../controllers/product/getProducts')
const { updateProduct } = require('../controllers/product/updateProduct')
const { deleteProduct } = require('../controllers/product/deleteProduct')

router.route('/').post(createProduct)
router.route('/search').get(getProducts)
router.route('/:id').get(getProducts)
router.route('/:id').patch(updateProduct)
router.route('/:id').delete(deleteProduct)


module.exports = router