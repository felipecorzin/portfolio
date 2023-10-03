const { response } = require('express');
const nodemailer = require("nodemailer");

const envioCorreo = async(req, res = response) => {
    const body = req.body;
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'jfelipestc@gmail.com',
          pass: 'kcvz svmu gqku sfve'
        }
    });

    const opciones = {
        from: 'Felipe El Corzín', // sender address
        subject: body.asunto, // Subject line
        to: body.email, // list of receivers
        text: body.mensaje, // plain text body
    };

    transporter.sendMail(opciones,function(error,result){
        if(error) return res.json({ok: false,msg:error});

        return res.json({
            ok: true,
            msg: result
        });
    });
};

module.exports = {
    envioCorreo
}