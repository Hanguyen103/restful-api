import {AppDataSource} from "./src/data-source";
import {BlogPost} from "./src/entity/BlogPost";
import express from "express";
import bodyParser from 'body-parser';
// import axios from 'axios';

const PORT = 3000;


AppDataSource.initialize().then(async connection => {
    const app = express();
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
    app.use(bodyParser.json());
    app.use(express.json());
    const ProductRepo = connection.getRepository(BlogPost);

    app.get('/', async (req, res) => {
        try {
            const lostPost = await ProductRepo.find();
            if (lostPost) {
                res.status(200).json({message: "Success", products: lostPost})
            }
        } catch (err) {
            res.status(500).json({message: "err"})
        }
    })
    app.post('/create', async (req, res) => {
        try {
            const postData = {
                name: req.body.name,
                description: req.body.description
            };
            const post = await ProductRepo.save(postData);
            if (post) {
                res.status(200).json({
                    message: "Create product success",
                    product: post
                });
            }
        } catch (err) {
            res.status(500).json({
                message: "err"
            })
        }
    })
    app.put('/update', async (req, res) => {
        try {
            let post = await ProductRepo.findOneBy({id: req.body.id});
            if (!post) {
                res.status(500).json({
                    message: "Post phẩm không tồn tại"
                })
            }
            const updatedPost = await ProductRepo.update({id: req.body.id}, req.body);
            res.status(200).json({
                message: "Update product success",
            });
        } catch (err) {
            res.status(500).json({
                message: "err"
            })
        }
    })
    app.delete("/delete", async (req, res) => {
        try {
            let searchResult = await ProductRepo.findOneBy({id: req.body.id});
            if (!searchResult) {
                res.status(500).json({
                    message: "Sản phẩm không tồn tại"
                })
            }
            const postResult = await ProductRepo.delete({id: req.body.id});
            res.status(200).json({
                message: "Delete product success",
            });
        } catch (err) {
            res.status(500).json({
                message:"error"
            })
        }
    });
    app.listen(PORT, () => {
        console.log("App running with port: " + PORT)
    })
})