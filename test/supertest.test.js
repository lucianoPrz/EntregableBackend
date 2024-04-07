import supertest from "supertest";
import {expect} from 'chai';

import { app } from "../src/app.js";


const requester = supertest(app);

describe("Testing de app Ecommece", () => {

    describe("Test del modulo Carts", () => {

        it("El endpoint /api/carts crea un carrito correctamente", async function(){
            const mockCart = {
                products: []
            }
            const result = await requester.post('/api/carts').send(mockCart);
            const {statusCode, _body} = result

            expect(statusCode).to.be.equal(200)
            expect(_body.status).to.be.equal("success")
        })

        it("Con el metodo get, la respuesta deber ser un objeto con un campo status y un payload, que debe ser un array", async function(){
            const response = await requester.get('/api/carts')

            // console.log(response)

            expect(response.statusCode).to.be.equal(200)
            expect(response.body).to.haveOwnProperty("status")
            expect(Array.isArray(response.body.payload)).to.deep.equal(true)
        })

    })

    

})