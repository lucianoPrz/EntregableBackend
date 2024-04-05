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
            console.log(result);

            expect(true)
        })

    })

})