const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationEmail = async (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Confirmation d'inscription",
    html: `
            <p>Merci de vous êtes inscrit ! Cliquez sur le lien suivant pour confirmer
            votre inscription. <a href="http://localhost:5000/api/users/verifyMail/${token}">Confirmer l'inscription</a></p>
        `,
  };

  await transporter.sendMail(mailOptions);
};

const sendValiditionAccount = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "inscription validée",
    html: `
              <p>Bienvenue sur notre site ! Cliquez sur le lien suivant pour vous connecter. <a href="http://localhost:5173/connexion">Page de connexion</a></p>
          `,
  };

  await transporter.sendMail(mailOptions);
};

const sendInvalidEmailToken = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Problème lors de la validation",
    html: `
                <p>Le temps a expiré ! Cliquez sur le lien suivant pour vous inscrit à nouveau. <a href="http://localhost:5173/inscription">Page d'inscription</a></p>
            `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendConfirmationEmail,
  sendValiditionAccount,
  sendInvalidEmailToken,
};
