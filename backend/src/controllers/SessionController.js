const connection = require('../database/connection.js');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong = await connection('ongs')
            .select('name')
            .where('id', id)
            .first();

        if (!ong) {
            response
                .status(400)
                .json({ msg: 'ONG não encontrada. Tente outro identificador' });
        }
        return response.json(ong);
    }
}