//popup message
const inputbox = document.querySelectorAll('.abperform');
const inputvalue = document.querySelectorAll('.boxinput');
const popbtng2 = document.querySelector('#lstbtng');
const popbtng = document.querySelector('.btng');
const popbox = document.querySelector('.poper');
const popup = document.querySelectorAll('.poperbox');
const opac = document.querySelector('.opac');
const par = document.querySelector('#lng');
const alertapper = document.querySelectorAll('.altmsg');
const alertcont = document.querySelectorAll('.alertbox');

let conformer = 0;
let falsealert = 0;
let touchS = 0;
let boxind = 0;
let entervalue ='';
let lan = JSON.parse(localStorage.getItem('lang')) || 0;
popup[lan].classList.add('selectedlang');
switcher(lan);

document.body.addEventListener('click', () => {
    
    if (popbox.classList.contains('Switchon')) {
        if (1-conformer) {
            popbox.classList.remove('Switchon');
            opac.style.opacity = 1;
        }
        conformer=0;
    }
    
    if (inputbox[boxind].classList.contains('onmail')) {
        if (!Number.isInteger(boxind)) {
            boxind = Number(boxind);
            return;
        }
        if(entervalue === '') {
            inputbox[boxind].classList.remove('onmail');
            truthAlert(1);
        }else if (touchS === 0) {
            falseAlert();
        }
    }
    //body area
});

popbtng.addEventListener('click', () => {
    if (!popbox.classList.contains('Switchon')) {
        popbox.classList.add('Switchon');
        opac.style.opacity = 0.2;
        conformer = 1;
    }
});
popbtng2.addEventListener('click', () => {
    if (!popbox.classList.contains('Switchon')) {
        popbox.classList.add('Switchon');
        opac.style.opacity = 0.2;
        conformer = 1;
    }
});

for(let i=0; i<popup.length; i++) {
    popup[i].addEventListener('click', () => {
       if (!popup[i].classList.contains('selectedlang')) {
          popup[i].classList.add('selectedlang');
          localStorage.setItem('lang', JSON.stringify(i));
          switcher(i);
       }else {
          return;
       }
    });
}
function switcher(index) {
    if (index) {
        popup[0].classList.remove('selectedlang');
        par.innerHTML = 'हिन्दी';
     }else {
        popup[1].classList.remove('selectedlang');
        par.innerHTML = 'English';
     }
}

//text box focus

for (let i = 0; i<inputbox.length; i++) {
    inputbox[i].addEventListener('click', () => {
        inputbox[i].classList.add('onmail');
        boxind = i.toString();
    });
}

let m = 0;
let count= 0;

for (let i = 0; i<inputvalue.length; i++) {
 inputvalue[i].addEventListener('keyup', () => {
    
    indexofC = i;
    entervalue = inputvalue[i].value;
    let len = entervalue.length;
    
    //FAKE ESCAPE CAUTCHER
    if (!(len === m)) {
        m = len;
    }
    else {
        return;
    }
    
    let temind = Checker(entervalue,'@');
    if (temind[0] > 1 || temind[2] < 2 || Checker(entervalue,' ')) {
        falseAlert();
    }
    else if (temind) {
        truthAlert(1);
        let temd = Checker(entervalue,'.');
        if (temd && temd[temd[0]]>temind[1]) {
           if (!(temd[temd[0]]>temind[1]+2)) {
               falseAlert();
           }
           else if (entervalue.length > temd[temd[0]]+1){
               let setval = ['c','o','m']
               let valuebox = []
               setval.forEach((m) => {
                  valuebox.push(entervalue.includes(m,temd[temd[0]]+1));
               });          
               valuebox.includes(true) ? truthAlert():falseAlert();
               valuebox.includes(true) ? touchS=1:touchS=0;
           }else {
               truthAlert(1);
           }           
        }else {            
            return;
        }        
    } else {
        truthAlert(1);
    }        
 });
}

function falseAlert() {
    falsealert = 1;
    inputvalue[boxind].style.borderColor = 'rgb(234,57,65)';
    alertapper[boxind].classList.add('wrongalert');
    let x = indexC(boxind);
    alertcont[x[0]].innerHTML = '&times;';
    alertcont[x[1]].innerHTML = 'Please enter a valid email address.';

}
function truthAlert(neutral) {
    falsealert = 0;
    if(neutral) {
        inputvalue[boxind].style.borderColor = 'rgb(99,100,102)';
    }else {
        inputvalue[boxind].style.borderColor = 'rgb(43,185,113)';
    }
    alertapper[boxind].classList.remove('wrongalert');
    let x = indexC(boxind);
    alertcont[x[0]].innerHTML = '';
    alertcont[x[1]].innerHTML = '';
}

//prosessing function
function Checker(word,letter) {    
    if (!word.includes(letter)) {
        return false;
    }    
    let values = [0];
    let count = 0;
    for (let i = 0; i<word.length; i++) {
        let tem = word[i];
        if (tem === letter) {
            count++;
            values.push(i);
        }
    }
    values[0] = count;
    return values;    
}

function indexC(value) {
    if (value === 0) {
        return [0,1];
    } else {
        return [2,3];
    }
}

// Question-Answer

const qnabox = document.querySelectorAll('.questbox');
const answ = document.querySelectorAll('.answer');
const list = [
    ['Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices.',
    'You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There\'s always something new to discover, and new TV shows and movies are added every week!'],
    'Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹ 149 to ₹ 649 a month. No extra costs, no contracts.',
    ['Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.',
    'You can also download your favourite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you\'re on the go and without an internet connection. Take Netflix with you anywhere.'],
    'Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.',
    'Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.',
    ['The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space.',
    'Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don\’t want kids to see.']
];

for (let i = 0; i<qnabox.length; i++) {
    qnabox[i].addEventListener('click', () => {
        if (!(answ[i].classList.contains('awing'))) {
            let value = checkForTog(answ,'awing');
            if (value !== 10) {
               removeClass(value);
            }
            answ[i].classList.add('awing');
            if ([0,2,5].includes(i)) {
                let sts = list[i]
                answ[i].innerHTML = sts[0]+'<p></p>'+sts[1];
            }else {
                answ[i].innerHTML = list[i];
            }
            qnabox[i].classList.add('rotcross');
            
        }else {
            removeClass(i);
        }
    });
}

function removeClass(val) {
    answ[val].classList.remove('awing');
    answ[val].innerHTML = '';
    qnabox[val].classList.remove('rotcross')
}

function checkForTog(Class,find) {
    for (let i = 0; i<Class.length; i++) {
        if (Class[i].classList.contains(find)) {
            return i;
        }
    }
    return 10;
    
}
