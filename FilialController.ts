import { Request, Response } from 'express';

import database from '../database/connection';

class FilialController {
    async create(request: Request, response: Response){
        const {
            siga_da_filial
        } = request.body;

        const filial = await database('filial').where('siga_da_filial', siga_da_filial).first();

        const filialAlreadyExist = filial ? true : false;

        const register = filialAlreadyExist ? "Filial já existente" : await database('filial').insert(siga_da_filial);
        
        const id = register[0];

        return response.json({
            id,
            register
          });
    };
    async get(request: Request, response: Response){
        const filiais = await database('filial').select("*");

        return response.json(filiais); 
    }
}

export { FilialController }