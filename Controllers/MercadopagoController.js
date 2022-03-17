const mercadopago = require("mercadopago")

exports.crearorden = async (req, res) => {

    mercadopago.configure({
        access_token: 'TEST-349705309563207-031513-cacf6d6ca9ce32114e82aa98efec7ced-306403489',
    })

    var preference = {
        items: [
            {
                title: "Pelota",
                quantity: 1,
                currency_id: "ARS",
                unit_price: 1.5
            }
        ],
        notification_url: "https://e3d7-181-230-204-75.ngrok.io"
    }

    mercadopago.preferences.create(preference)
    .then((r) => {
        res.json(r)
    })
    .catch((e) => {
        console.log(e)
    })
}

exports.notificacionorden = async (req,res) => {
    const datos = req.query;

    console.log(datos)

    res.status(200)
}