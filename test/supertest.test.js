import supertest from "supertest";
import { expect } from 'chai';

import { app } from "../src/app.js";


const requester = supertest(app);

function generarCodigo() {
    let letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let numeros = '0123456789';
    let codigo = '';
  
    // Generar tres letras aleatorias
    for (let i = 0; i < 3; i++) {
      codigo += letras.charAt(Math.floor(Math.random() * letras.length));
    }
  
    // Generar tres números aleatorios
    for (let j = 0; j < 3; j++) {
      codigo += numeros.charAt(Math.floor(Math.random() * numeros.length));
    }
  
    return codigo;
  }
  
  

describe("Testing de app Ecommece", () => {

    describe("Test del modulo Carts", () => {

        it("El endpoint /api/carts crea un carrito correctamente", async function () {
            const mockCart = {
                products: []
            }
            const result = await requester.post('/api/carts').send(mockCart);
            const { statusCode, _body } = result

            expect(statusCode).to.be.equal(200)
            expect(_body.status).to.be.equal("success")
        })

        it("Con el metodo get, la respuesta deber ser un objeto con un campo status y un payload, que debe ser un array", async function () {
            const response = await requester.get('/api/carts')

            // console.log(response)

            expect(response.statusCode).to.be.equal(200)
            expect(response.body).to.haveOwnProperty("status")
            expect(Array.isArray(response.body.payload)).to.deep.equal(true)
        })

    })

    describe("Test del modulo Products", () => {

        it("El endpoint /api/products crea un producto correctamente", async function () {
            const mockProduct = {
                title: "producto prueba 555",
                description: "Esto es un producto prueba 555",
                price: 555,
                code: generarCodigo(),
                stock: 25,
                status: true,
                category: "C",
                thumbnail: "#"
            }
            const result = await requester.post('/api/products').send(mockProduct);
            const { statusCode, _body } = result

            expect(statusCode).to.be.equal(200)
            expect(_body.status).to.be.equal("success")
        })

        it("Con el metodo get, la respuesta deber ser un objeto con un campo status y un payload, que contiene un campo docs, que debe ser un array", async function () {
            const response = await requester.get('/api/products')

            // console.log(response)

            expect(response.statusCode).to.be.equal(200)
            expect(response.body).to.haveOwnProperty("status")
            expect(Array.isArray(response.body.payload.docs)).to.deep.equal(true)
        })

        it("PUT api/products debe retornar 200", async function () {
            const mockProduct = {
                title: "SmartPhone Xiaomi 11",
                description: "Esto es un producto prueba 555",
                price: 555,
                code: generarCodigo(),
                stock: 25,
                status: true,
                category: "C",
                thumbnail: "#"
            }

            const mockUpdateProduct = {
                title: "SmartPhone Samsung s23",
                description: "Esto es un producto prueba 555",
                price: 555,
                code: generarCodigo(),
                stock: 25,
                status: true,
                category: "C",
                thumbnail: "#"
            }

            const {body, statusCode, ok} = await requester.post("/api/products").send(mockProduct)

            const result = await requester.put(`/api/products/${body.payload._id}`).send(mockUpdateProduct)

            const response = await requester.get(`/api/products/${body.payload._id}`)

            console.log(response.body.payload.title);

            expect(response.body.payload.title).to.not.be.equal(mockProduct.title)
        })

        it("DELETE debe retornar 200", async function () {
            const mockProduct = {
                title: "SmartPhone Xiaomi 11",
                description: "Esto es un producto prueba 555",
                price: 555,
                code: generarCodigo(),
                stock: 25,
                status: true,
                category: "C",
                thumbnail: "#"
            }

            const {body, statusCode, ok} = await requester.post("/api/products").send(mockProduct)

            const responseDelete = await requester.delete(`/api/products/${body.payload._id}`)
            
            const response = await requester.get(`/api/products/${body.payload._id}`)


            expect(response.body.payload).to.be.equal(undefined)
            
        })

    })

    // describe("Test del modulo Sessions", () => {

    //     it("", async function () {
           
    //     })

    //     it("", async function () {
           
    //     })

    // })

})