"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const ProductService_1 = require("../services/ProductService");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
class ProductController {
    constructor() {
        this.productService = new ProductService_1.ProductService();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, price, description, categoryId } = req.body;
                if (!req.files || Object.keys(req.files).length === 0) {
                    throw new Error("Error upload file");
                }
                const file = req.files['file'];
                const resultFile = yield new Promise((resolve, reject) => {
                    cloudinary_1.v2.uploader.upload_stream({}, function (error, result) {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(result);
                    }).end(file.data);
                });
                const product = yield this.productService.create({ name, price, description, banner: resultFile.url, categoryId });
                return res.status(200).json(product);
            }
            catch (err) {
                return res.status(400).json({ Error: err.message });
            }
        });
    }
    listByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = req.query.category_id;
                const products = yield this.productService.listByCategory(categoryId);
                return res.status(200).json(products);
            }
            catch (err) {
                return res.status(400).json({ Error: err.message });
            }
        });
    }
}
exports.ProductController = ProductController;
