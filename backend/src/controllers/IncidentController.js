const connection = require('../database/connection');

module.exports = {
  async index(reqest, response) {
    const { page = 1 } = reqest.query;

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('ngos', 'ngos.id', '=', 'incidents.ngo_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*', 
        'ngos.name', 
        'ngos.email', 
        'ngos.whatsapp', 
        'ngos.city', 
        'ngos.uf'
      ]);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(incidents);
  },

  async store(reqest, response) {
    const { title, description, value } = reqest.body;

    const ngo_id = reqest.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ngo_id
    });

    return response.json({ id });
  },

  async destroy(reqest, response) {
    const { id } = reqest.params;

    const ngo_id = reqest.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ngo_id')
      .first();

    if (incident.ngo_id !== ngo_id) {
      return response.status(401).json({ error: 'Operation not allowed!' });
    }

    await connection('incidents').where('id', id).delete();

    return response.status(204).send();
  }
}