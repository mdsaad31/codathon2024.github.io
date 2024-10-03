let question;
let form;
let res;
let qno;
let score;

const questions = [
    {
        title : 'StoCX invented by?',
        options : [
            'Zerodha investor', 
            'team meta warrior', 
            'Google ', 
            'Microsoft'
        ],
        answer : '1',
        score : 1
    },
    {
        title : 'Which of these is a function of stock exchange ?',
        options : [
            'role of an economic barometer',
            'valuation of securities',
            'encouraging investments and savings',
            'all of the above'
        ],
        answer : '3',
        score : 1
    },
    {
        title : 'which of these is the regulatory body for the capital markets in India ?',
        options : [
            'National Bank for Agriculture and Rural Development(NABARD)',
            'Securities and Exchange Board of India(SEBI)',
            'Insurance Regulatory and Development Authority(IRDA)',
            'Reserve Bank of India(RBI)'
        ],
        answer : '1',
        score : 1
    },
    {
        title : 'How many companies are a part of SENSEX(Stock Exchange Sensitive Index)?',
        options : [
            '20',
            '30',
            '50',
            '100'
        ],
        answer : '1',
        score : 1
    },
    {
        title : 'Which of the following terms is not related to stock exchange ?',
        options : [
            'Knowledge Process Outsource(KPO)',
            'Net Asset Value(NAV)',
            'Initial Public Offering(IPO)',
            'National Stock Exchange(NSE)'
        ],
        answer : '0',
        score : 1
    },
    {
        title : 'When was NIFTY(National Stock Exchange Fifty) eshtablished?',
        options : [
            '1992',
            '1998',
            '1996',
            '1994'
        ],
        answer : '2',
        score : 1
    },
    {
        title : 'A contract between a buyer and seller, entered on a particular date,regarding a transaction that they will fulfill at a later date, is known as ?',
        options : [
            'Forward Contract',
            'Future Contract',
            'Fixed Contract',
            'Derivative Contract'
        ],
        answer : '1',
        score : 1
    },
    {
        title : 'The first computerized stock exchange in India was ?',
        options : [
            'Bombay Stock Exchange(BSE)',
            'Multi Commodity Exchange(MCX) ',
            'National Stock Exchange(NSE) ',
            'Over-the-Counter Exchange of India (OCTEI)'
        ],
        answer : '2',
        score : 1
    },
    {
        title : 'NIFTY and SENSEX are calculated based on ?',
        options : [
            'Free -Float Capitaliation',
            'Market capitalisation ',
            'Authorized share Capital',
            'Paid up-Capital'
        ],
        answer : '0',
        score : 1
    },
    {
        title : 'Which of these derivatives does not get traded in the Indian Stock Exchanges ?',
        options : [
            'Forward rate Agreement',
            'Index Options',
            'Index Futures',
            'Commodity option'
        ],
        answer : '0',
        score : 1
    }
];

function restartScreen() {
    document.querySelector('.quiz-heading').innerHTML = `Score : ${score}`
    const card = document.querySelector('.question-card');
    card.innerHTML = "<ul>";
    questions.forEach((ques) => {
        const html = `
        <li>${ques.title} <div class="answer-label">${ques.options[ques.answer]}</div></li>
        `;
        card.innerHTML += html;
    });
    card.innerHTML += "</ul>";
    document.querySelector('.answer-key').style.display ='block';
    document.querySelector('button').style.display ='block';
}

function resetradio() {
    document.querySelectorAll('[type="radio"]').forEach((radio) => {
        radio.removeAttribute("disabled");
    });
    res.setAttribute("class","idle");
    res.innerHTML = "Empty";
}

function evaluate() {
    if(form.op.value == questions[qno].answer) {
        res.setAttribute("class","correct");
        res.innerHTML = "Correct";
        score += questions[qno].score;

    } 
    else {
        res.setAttribute("class","incorrect");
        res.innerHTML = "Incorrect";
    }
    document.querySelectorAll('[type="radio"]').forEach((radio) => {
        radio.setAttribute("disabled","");
    })
}

function getNextQuestion() {
    qno++;
    ques = questions[qno];
    question.innerHTML = ques.title;
    const labels = document.querySelectorAll('label');
    labels.forEach((label, idx) => {
        label.innerHTML = ques.options[idx];
    }); 
}

function handleSubmit(e) {
    e.preventDefault();
    if(!form.op.value) {
        alert('Please select an option');
    }
    else if(form.submit.classList.contains('submit')) {
        evaluate();
        form.submit.classList.remove('submit');
        form.submit.value = "Next"
        form.submit.classList.add('next');
    }
    else if(qno < questions.length - 1 && form.submit.classList.contains('next')) {
        getNextQuestion();
        resetradio();
        form.submit.classList.remove('next');
        form.submit.value = "Submit"
        form.submit.classList.add('submit');
        form.reset();
    }
    else if(form.submit.classList.contains('next')) {
        restartScreen();
        form.submit.classList.remove('next');
        form.submit.value = "Submit"
        form.submit.classList.add('submit');
        form.reset();
    }
}
function init() {
    document.body.innerHTML = `
        <h1 class="quiz-heading">Quiz</h1>
        <div class="app-body">
            <h1 class="answer-key">Answer Key</h1>
            <div class="question-card">
                <h2 id='question'>Question</h2>
                <form>
                    <input type="radio" id="op1" name="op" value="0">
                    <label for="op1">op1</label><br>
                    <input type="radio" id="op2" name="op" value="1">
                    <label for="op2">op2</label><br>
                    <input type="radio" id="op3" name="op" value="2">
                    <label for="op3">op3</label><br>
                    <input type="radio" id="op4" name="op" value="3">
                    <label for="op4">op4</label><br>
                    <div id = "res" class="idle">Empty</div><br>
                    <input type="submit" name="submit" value = 'Submit' class = "submit"/>
                </form>
            </div>
            <button>Restart</button>
        </div>
    `;
   question = document.querySelector('#question');
   form = document.querySelector('form');
   res = document.querySelector('#res');
   qno = -1;
   score = 0;
   form.addEventListener('submit', handleSubmit);
   document.querySelector('button').addEventListener('click', init);
   getNextQuestion();
}
document.querySelector('button').addEventListener('click', init);
init();