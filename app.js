const express = require('express');
const hbs = require('hbs');
const path = require('path');
const multer = require('multer');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');

const app = express();
const port = 3000;


app.use(helmet());

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


let complaintData = null;


hbs.registerHelper('expectedReviewDate', function(date) {
    const reviewDate = new Date(date);

    let businessDays = 0;

    while (businessDays < 3) {
        reviewDate.setDate(reviewDate.getDate() + 1);

        const day = reviewDate.getDay();

        if (day !== 0 && day !== 6) {
            businessDays++;
        }
    }

    return reviewDate.toLocaleDateString();
});


app.get('/', (req, res) => {
    res.render('index');
});


app.post('/complaints',
    upload.single('complaintImage'),

    body('fullName')
        .notEmpty()
        .withMessage('Full name is required.'),

    body('email')
        .isEmail()
        .withMessage('Enter a valid email address.'),

    body('phone')
        .notEmpty()
        .withMessage('Phone number is required.'),

    body('vehicleMake')
        .notEmpty()
        .withMessage('Vehicle make is required.'),

    body('vehicleModel')
        .notEmpty()
        .withMessage('Vehicle model is required.'),

    body('vin')
        .isLength({ min: 17, max: 17 })
        .withMessage('VIN must be 17 characters.'),

    body('subject')
        .notEmpty()
        .withMessage('Subject is required.'),

    body('description')
        .notEmpty()
        .withMessage('Description is required.'),

    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        complaintData = {
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            vehicleMake: req.body.vehicleMake,
            vehicleModel: req.body.vehicleModel,
            vin: req.body.vin,
            subject: req.body.subject,
            description: req.body.description,
            image: req.file ? req.file.filename : null,
            submittedAt: new Date()
        };

        res.redirect('/complaint');
    }
);


app.get('/complaint', (req, res) => {
    res.render('complaint', {
        complaint: complaintData
    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});