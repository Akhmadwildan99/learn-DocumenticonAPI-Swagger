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
 *    summary: Returns the list of  the book by Id
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
 *         description: The list of book by Id

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

/**
 * @swagger
 * paths:
 *  /books/{id}/:
 *   put:
 *    tags: [Books]
 *    summary: Update the book that finished read
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
 *         description: The book are finished read

 */
router.put('/:id', async (req, res) => {
    try {
        const book = await Book.update({isRead: true},{where: {id: req.params.id} });
        res.status(200).json({message: `Buku selesai dibaca`})
    } catch {
        res.status(401).json({message: 'Buku belum selesai dibaca'})
    }
});


/**
 * @swagger
 * paths:
 *  /books/{id}/:
 *   delete:
 *    tags: [Books]
 *    summary: Remove book from the list
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
 *         description: Successed remove book from the list

 */
router.delete('/:id', async (req, res) => {
    try {
        const book = await Book.destroy({where: {id: req.params.id}});
        res.status(200).json({message: "Menghapus buku dari list!"});
    } catch  {
        res.status(401).json({message: "Tidak berhasil menghapus buku dari list!"})
    }
})
 

module.exports = router