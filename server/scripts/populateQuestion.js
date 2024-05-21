// scripts/populateQuestions.js
const mongoose = require('mongoose');
const keys = require('../config/keys');
const { default: question } = require('../models/question');
require('dotenv').config();

const availablequestions = [
    {
        questionText: "What is 2 + 2?",
        options: [
            { text: "3", isCorrect: false },
            { text: "4", isCorrect: true },
            { text: "5", isCorrect: false },
            { text: "6", isCorrect: false }
        ],
        difficulty: 1,
        tags: ["arithmetic"]
    },
    {
        questionText: "What is the area of a triangle with base 5 and height 10?",
        options: [
            { text: "25", isCorrect: true },
            { text: "30", isCorrect: false },
            { text: "50", isCorrect: false },
            { text: "15", isCorrect: false }
        ],
        difficulty: 2,
        tags: ["geometry"]
    },
    {
        questionText: "What is the capital of India?",
        options: [
            { text: "Delhi", isCorrect: true },
            { text: "Mumbai", isCorrect: false },
            { text: "Chandigarh", isCorrect: false },
            { text: "Kolkata", isCorrect: false }
        ],
        difficulty: 3,
        tags: ["geography"]
    },
    {
        questionText: "What is the capital of France?",
        options: [
            { text: "Paris", isCorrect: true },
            { text: "London", isCorrect: false },
            { text: "Berlin", isCorrect: false },
            { text: "Madrid", isCorrect: false }
        ],
        difficulty: 4,
        tags: ["geography"]
    },
    {
        questionText: "What is the capital of USA?",
        options: [
            { text: "New York", isCorrect: false },
            { text: "Los Angeles", isCorrect: false },
            { text: "Chicago", isCorrect: false },
            { text: "Washington DC", isCorrect: true }
        ],
        difficulty: 5,
        tags: ["geography"]
    },
    {
        questionText: "What is the capital of Canada?",
        options: [
            { text: "Toronto", isCorrect: false },  
            { text: "Vancouver", isCorrect: false },
            { text: "Ottawa", isCorrect: true },
            { text: "Calgary", isCorrect: false }
        ],
        difficulty: 6,
        tags: ["geography"]
    },
    {
        questionText: "What is the capital of Brazil?",
        options: [
            { text: "Brasilia", isCorrect: true },
            { text: "Sao Paulo", isCorrect: false },
            { text: "Rio de Janeiro", isCorrect: false },
            { text: "Salvador", isCorrect: false }
        ],
        difficulty: 7,
        tags: ["geography"]
    },
    {
        questionText: "What is the capital of Germany?",
        options: [
            { text: "Berlin", isCorrect: true },
            { text: "Munich", isCorrect: false },
            { text: "Frankfurt", isCorrect: false },
            { text: "Hamburg", isCorrect: false }
        ],
        difficulty: 8,
        tags: ["geography"]
    },
    {
        questionText: "What is the capital of Japan?",
        options: [
            { text: "Tokyo", isCorrect: true },
            { text: "Osaka", isCorrect: false },
            { text: "Kyoto", isCorrect: false },
            { text: "Nagoya", isCorrect: false }
        ],
        difficulty: 9,
        tags: ["geography"]
    },
    {
        questionText: "What is the capital of Australia?",
        options: [
            { text: "Sydney", isCorrect: true },
            { text: "Melbourne", isCorrect: false },
            { text: "Brisbane", isCorrect: false },
            { text: "Perth", isCorrect: false }
        ],
        difficulty: 10,
        tags: ["geography"]
    }
];

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('MongoDB connected');
    return question.insertMany(availablequestions);
}).then(() => {
    console.log('Questions inserted');
    mongoose.disconnect();
}).catch(err => {
    console.error(err);
    mongoose.disconnect();
});
