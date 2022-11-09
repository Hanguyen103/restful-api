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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./src/data-source");
const BlogPost_1 = require("./src/entity/BlogPost");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// import axios from 'axios';
const PORT = 3000;
data_source_1.AppDataSource.initialize().then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
    app.use(body_parser_1.default.json());
    app.use(express_1.default.json());
    const ProductRepo = connection.getRepository(BlogPost_1.BlogPost);
    app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const lostPost = yield ProductRepo.find();
            if (lostPost) {
                res.status(200).json({ message: "Success", products: lostPost });
            }
        }
        catch (err) {
            res.status(500).json({ message: "err.mesage" });
        }
    }));
    app.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const postData = {
                name: req.body.name,
                description: req.body.description
            };
            const post = yield ProductRepo.save(postData);
            if (post) {
                res.status(200).json({
                    message: "Create product success",
                    product: post
                });
            }
        }
        catch (err) {
            res.status(500).json({
                message: "err.message"
            });
        }
    }));
    app.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let post = yield ProductRepo.findOneBy({ id: req.body.id });
            if (!post) {
                res.status(500).json({
                    message: "Post phẩm không tồn tại"
                });
            }
            const updatedPost = yield ProductRepo.update({ id: req.body.id }, req.body);
            res.status(200).json({
                message: "Update product success",
            });
        }
        catch (err) {
            res.status(500).json({
                message: "err.message"
            });
        }
    }));
    app.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let searchResult = yield ProductRepo.findOneBy({ id: req.body.id });
            if (!searchResult) {
                res.status(500).json({
                    message: "Sản phẩm không tồn tại"
                });
            }
            const postResult = yield ProductRepo.delete({ id: req.body.id });
            res.status(200).json({
                message: "Delete product success",
            });
        }
        catch (err) {
            res.status(500).json({
                message: "error"
            });
        }
    }));
    app.listen(PORT, () => {
        console.log("App running with port: " + PORT);
    });
}));
