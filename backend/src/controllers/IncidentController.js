const connection = require('../database/connection');

module.exports = {
    async list(request, response) {
        try {
            const { page = 1 } = request.query;

            const [count] = await connection('incidents').count('id');

            const incidents = await connection('incidents')
                .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
                .limit(5)
                .offset((page - 1) * 5)
                .select([
                    'incidents.*',
                    'ongs.name',
                    'ongs.email',
                    'ongs.whatsapp',
                    'ongs.city',
                    'ongs.uf'
                ])
                .orderBy('incidents.id', 'asc');

            response.header('X-Total-Count', count['count(`id`)']);

            return response.json(incidents);
        }
        catch (error) {
            return response
                .status(500)
                .json({ msg: error });
        }
    },
    async create(request, response) {
        try {
            const { title, description, value } = request.body;
            const ong_id = request.headers.authorization;

            const [id] = await connection('incidents')
                .insert({
                    title,
                    description,
                    value,
                    ong_id,
                });
            return response.json({ id });
        } catch (error) {
            return response
                .status(400)
                .json({ msg: error });
        }

    },
    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .select('ong_id')
            .where('id', id)
            .first();

        if (incident.ong_id !== ong_id) {
            return response
                .status(401)
                .json({ error: 'Você não possui autorização para remover itens de outras ONGS.' });
        }
        await connection('incidents')
            .where('id', id)
            .delete();

        return response
            .status(204)
            .send();

    }
};