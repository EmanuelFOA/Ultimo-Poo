import { Request, Response } from 'express';

import database from '../database/connection';

class ManutencaoController {
    async create(request: Request, response: Response) {
        const {
            nome_do_centro_de_custo,
            nome_do_produto,
            servico_executado,
            data_do_servico,
        } = request.body;

        const manutencao = {
            nome_do_centro_de_custo: nome_do_centro_de_custo,
            nome_do_produto: nome_do_produto,
            servico_executado: servico_executado,
            data_do_servico: data_do_servico,
        }

        const register = await database('manutencao').insert(manutencao);

        const id = register[0];

        return response.json({
            id,
            ...register
        });
    };
    async getAll(request: Request, response: Response) {
        const manutencoes = await database('manutencao').select("*");
        const fornecedores = await database('fornecedor').select("*");
        const filiais = await database('filial').select("*");

        return response.json({
            manutencoes,
            fornecedores,
            filiais
        });
    }
    async deleteAll(request: Request, response: Response) {
        const {
            id_manutencao
          } = request.params;
      
          const deleteManutencao = await database('manutencao').where({id: id_manutencao}).delete();

          response.json(deleteManutencao);
    }
    async update(request: Request, response: Response) {
        const {
            id: id,
            nome_do_centro_de_custo,
            nome_do_produto,
            servico_executado,
            data_do_servico,
        } = request.body;

        const idExist = await database('manutencao').where('id', id).first();

        const updateManutencao = {
            nome_do_centro_de_custo,
            nome_do_produto,
            servico_executado,
            data_do_servico,
        }

        const register = idExist ? await database('manutencao').where({id: id}).update(updateManutencao) : "Id não encontrado";

        return response.json({
            id,
            ...updateManutencao
          });
    }
}

export { ManutencaoController }