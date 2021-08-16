const express = require('express');
const router = express.Router();
const {Book} = require('../models');

/** 
 * @swagger
 * components:
 *   schemas:
 *      Book:
 *       type: object
 *       required:
 *         -book
 *         -author
 *         -isRead
 *       properties:
 *         id: 
 *            type: integer
 *            description: The auto generated Id of the book.
 *         title: 
 *            type: string
 *            description: The title of the book.
 *         author:
 *            type: string
 *            description: Who wrote the book?
 *         isRead: 
 *            type: boolean
 *            description: Have you read this book?
 *         createdAt:
 *            type: string
 *            formate: date
 *            description: The data of the record creation.
 *         updatedAt:
 *            type: string
 *            formate: date
 *            description: The data of the record Update.
 *       example: 
 *          title : Blink
 *          author: Malcom Gadwell
 *          isRead: false
 * */


/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API to manage your book.
 */

/**
 * @swagger
 * paths: 
 *  /books:
 *    post:
 *     summary: Creates a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content: 
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *     responses: 
 *       "200": 
 *         description: The created new book.
 */

router.post('/', async (req, res) => {
    try {
       const book = await Book.create({
           title: req.body.title,
           author: req.body.author,
           isRead: false 
       });
       
       res.status(200).json(book)
    } catch {
        res.status(404).json({
            message: "Can't add a new book!"
        })
    }
})

/**
 * @swagger
 * paths:
 *  /books:
 *   get:
 *    tags: [Books]
 *    summary: Returns the list of all the book
 *    content:
 *      application/json:
 *      schema:
 *         $ref: '#/components/schemas/Book'
 *    responses:
 *       "200":
 *         description: The list of book

 */

router.get('/', async (req, res) => {
    try {
        const books = await Book.findAll();
        res.status(200).json(books);
    } catch{
        res.status(401).json({
            message: "Can't Execute this request!"
        })
    }
});

/**
 * @swagger
 * paths:
 *  /books/{id}/:
 *   get:
 *    tags: [Books]
 *    summary: Returns the list of all the book
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        type: string
 *        required: true
 *        description: The book id
 *    content:
 *      application/json:
 *      schema:
 *         $ref: '#/components/schemas/Book'
 *    responses:
 *       "200":
 *         description: The list of book

 */

 router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findOne({where: {id: req.params.id}});
        res.status(200).json(book);
    } catch{
        res.status(401).json({
            message: "Can't Execute this request!"
        })
    }
});
 

module.exports = router