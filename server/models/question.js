import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OptionSchema = new Schema({
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false }
});

const QuestionSchema = new Schema({
    questionText: { type: String, required: true },
    options: [OptionSchema],
    difficulty: { type: Number, required: true },
    tags: { type: [String], required: true }
});


export default mongoose.model('Question', QuestionSchema);
