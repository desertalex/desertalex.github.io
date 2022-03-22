const addElementToAnswer = str => {
    const para = document.createElement("p");
    const node = document.createTextNode(str);
    para.appendChild(node);
    const element = document.getElementById("answer");
    element.appendChild(para)
}

const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false; 
    return num > 1;
}

const calculate = () => {
    const number = document.getElementById('number').value;
    let isnum = /^\d+$/.test(number);
    document.getElementById('answer').innerHTML = '';
    if (isnum) {
        numChar = number.split('');
        var notFinished = true;
        while (notFinished) {
            var totalNum = 0;
            str = '';
            for (num in numChar) {
                numChar[num] = numChar[num] * numChar[num];
                totalNum += numChar[num];
                str += numChar[num];
                if (numChar.length - 1 == num) {
                    str += ' = ' + totalNum;
                    addElementToAnswer(str);
                } else {
                    str += ' + ';
                }
            }
            if (totalNum == 1) {
                notFinished = false;
                if (isPrime(number)) {
                    addElementToAnswer('This is a happy prime number!');
                } else {
                    addElementToAnswer('This is a happy number!')
                }
            } else if (totalNum == 4) {
                notFinished = false;
                addElementToAnswer('This is NOT a happy number!');
            }
            numChar = totalNum.toString().split('');
        }
    } else {
        addElementToAnswer('Naughty naughty, only type numbers!');
    }
}