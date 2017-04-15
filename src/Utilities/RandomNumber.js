
const randomNumber = (min, max, exclude) => {
    var minNum = (min || 0);
    var maxNum = (max || 0);

    let result = Math.floor(Math.random() * (maxNum - minNum + 1)) + min;
    if ((exclude || []).indexOf(result) !== -1) {
        result = randomNumber(min, max, exclude);
    }

    return result;
}

export default randomNumber;