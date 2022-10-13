// https://ethereal.email/
module.exports = {
    service: {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        user: 'felicita76@ethereal.email',
        password: 'hJ3M69Cs7qabRcUveX'
    },
    registerVerification: {
        from: 'GymApp <noreply@gymapp.com>',
        subject: 'Confirme su cuenta de GymApp',
        htmlBodyTemplate:
            `<html>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
                <style>
                    .header {
                        display: flex;
                    }
            
                    .div {
                        font-family: 'Inter', sans-serif;
                        background-color: #181818;
                        color: #FFFFFF;
                        padding: 8px 16px;
                        width: 40%;
                        min-width: fit-content;
                        margin: auto;
                    }
                    .button {
                        display: block;
                        width: 20%;
                        min-width: fit-content;
                        height: 25px;
                        background-color: #BF3D3D;
                        color: white;
                        padding: 12px;
                        text-align: center;
                        line-height: 25px;
                        border-radius: 28px;
                        font-weight: bold;
                        text-decoration: none;
                        transition-duration: 0.4s;
                    }
            
                    .button:hover {
                        filter: brightness(90%);
                    }
            
                    .code {
                        padding-top: 12px;
                        padding-bottom: 12px;
                        background-color: #252525;
                        text-align: center;
                    }
            
                    .hr {
                        border: 1px solid #BF3D3D;
                        border-radius: 4px;
                        fill: #BF3D3D;
                    }
                </style>
            </head>
            
            <body>
                <div class="div">
                    <div class="header">
                        <h1 style="text-align:left">
                            Logo
                        </h1>
                    </div>
                    <h1 style="text-align: left;">
                        Bienvenido a GymApp, <%USERNAME%>
                    </h1>
                    <p>Ha recibido este mensaje porque fue registrado recientemente a una cuenta de GymApp.</p>
                    <p>Ingrese el código siguiente en el link de abajo para desbloquear su progreso personal:</p>
                    <h1 class="code">
                        <%CODE%>
                    </h1>
                    <a class="button" href="<%CONFIRM_LINK%>">Confirmar email</a>
                    <p>
                        Si no creó una cuenta de Gymapp, ignore este mensaje.
                    </p>
                    <hr class="hr">
                    </hr>
                    <p style="text-align: center">
                        Este link es válido hasta <%EXPIRATION_DATE%>
                    </p>
                </div>
            </body>
            
            </html>`,
        confirmationLink: 'http://localhost:8081/verify/<%EMAIL%>',
        codeExpirationInterval: 24 * 60 * 60 * 1000
    }
}