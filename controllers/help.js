const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASSWORD
  }
});

/**
 * GET /help
 * help form page.
 */
exports.gethelp = (req, res) => {
  res.render('help', {
    title: 'help'
  });
};

/**
 * POST /help
 * Send a help form via Nodemailer.
 */
exports.posthelp = (req, res) => {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('message', 'Message cannot be blank').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/help');
  }

  const mailOptions = {
    to: 'your@email.com',
    from: `${req.body.name} <${req.body.email}>`,
    subject: 'help Form | Hackathon Starter',
    text: req.body.message
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      req.flash('errors', { msg: err.message });
      return res.redirect('/help');
    }
    req.flash('success', { msg: 'Email has been sent successfully!' });
    res.redirect('/help');
  });
};
