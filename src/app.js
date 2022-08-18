import express, { response } from "express";
import fetch from "node-fetch";

const app = express();

const teste1 = [
    {id: 1, "titulo": "teste1"},
    {id: 2, "titulo": "teste2"}
]

app.get('/', (req, res) => {
    res.status(200).send('alou')
})

app.get('/teste1', (req, res) => {
    res.status(200).json(teste1)
})

app.post('/cep', (req, res) => {
    let teste = req.query;
    let dominio_valor = req.query.dominio_valor;
    let entidade_valor = req.query.entidade_valor;
    let id_valor = req.query.id_valor;
    let cep_valor = req.query.cep_valor.replace('-','').replace('.','');
    let rua_id= req.query.rua_id;
    let complemento_id = req.query.complemento_id;
    let bairro_id = req.query.bairro_id;
    let localidade_id = req.query.localidade_id;
    let uf_id = req.query.uf_id;


    async function getResposta() {
        const response = await fetch(
            `https://viacep.com.br/ws/${cep_valor}/json/`,
            {
                method: 'GET'
            }
        );
        const data = await response.json();

        console.log(data)

        let logradouro = data.logradouro
        let complemento = data.complemento
        let bairro = data.bairro
        let localidade = data.localidade
        let uf = data.uf

        async function postBitrix24() {

            const urlBitrix = `https://${dominio_valor}/crm.lead.update?ID=${id_valor}&FIELDS[${rua_id}]=${logradouro}&FIELDS[${complemento_id}]=${complemento}&FIELDS[${bairro_id}]=${bairro}&FIELDS[${localidade_id}]=${localidade}&FIELDS[${uf_id}]=${uf}`
            const response1 = await fetch(
                urlBitrix,
                {
                    method: 'POST'
                }
            );
            const data1 = await response1.json();

            console.log(data1)
        }

        postBitrix24()
    }

    getResposta()

/*     fetchCEP = () => {
        const url = `https://viacep.com.br/ws/${cep_valor}/json/`
        console.log(url)

        fetch(url, {
            method: 'GET'
        })
            .then(resposta => resposta.json())
            .then(resposta => console.log(resposta))
    }
    

    fetchCEP()
 */

    console.log(dominio_valor)
    console.log(entidade_valor)
    console.log(id_valor)
    console.log(cep_valor)

    res.status(200).json(teste)
})

export default app