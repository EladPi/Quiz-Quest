const shuffleAnswers = (correct, incorrect) => {
    const allAnswers = [correct, ...incorrect];
    return allAnswers.sort(() => Math.random() - 0.5);
};

export default shuffleAnswers;

