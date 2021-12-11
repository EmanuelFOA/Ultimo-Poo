import { Request, Response } from 'express';

import database from '../database/connection';

class FornecedorController {
    async create(request: Request, response: Response) {
        const {
            nome_do_fornecedor,
            email,
            telefone
        } = request.body;

        const fornecedor = {
            nome_do_fornecedor: nome_do_fornecedor,
            email: email,
            telefone: telefone
        };

        const emailExist = await database('fornecedor').where("email", email).first();

        const register = emailExist ? "Fornecedor já cadastrado" : await database('fornecedor').insert(fornecedor);

        const id = register[0];

        return response.json({
            id,
            ...fornecedor
          });
    };
    async get(request: Request, response: Response) {
        const fornecedores = await database('fornecedor').select("*");

        return response.json(fornecedores); 
    }
}

export { FornecedorController }