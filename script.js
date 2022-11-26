let num1 = ''; // Первое число
let num2 = ''; // Второе число
let oper = ''; // Операция
let finish = false;
const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'x', '/', '%', '+/-'];

const out = document.querySelector('.result__window span');
const at = document.querySelector('.ac span');

let TextOutput = (output) =>{
    output = output.toString();
    if (output.length === 0){
        return 0;
    }else if (output.length == undefined || output.includes('.')){
        return output;
    } else if (output.length > 3 && output.length <= 6){
        return output.slice(0, output.length-3) + ' ' + output.slice(output.length-3, output.length);
    } else if (output.length > 6){
        return output.slice(0, output.length-6) + ' ' + output.slice(output.length-6, output.length-3) + ' ' + output.slice(output.length-3, output.length);
    } else{
        return output;
    }
}

let ClearButtons = () =>{
    document.getElementById("plus").style.backgroundColor= '#FF9500';
    document.getElementById("minus").style.backgroundColor= '#FF9500';
    document.getElementById("division").style.backgroundColor= '#FF9500';
    document.getElementById("mult").style.backgroundColor= '#FF9500';
    document.getElementById("plus").style.color = '#fff';
    document.getElementById("minus").style.color = '#fff';
    document.getElementById("division").style.color = '#fff';
    document.getElementById("mult").style.color = '#fff';
}

let clear = () =>{
    if (num2 !== '' && finish !== true){
        num2 = '';
        out.textContent = 0;
    } else{
        num1 = '';
        num2 = '';
        oper = '';
        finish = false;
        out.textContent = 0;
        at.textContent = 'AC';
        ClearButtons();
    }
}

document.querySelector('.calc__buttons').onclick = (event) =>{
    document.querySelector('.ac').onclick = clear;
    if (num1 !== ''){
        at.textContent = 'C';
    } 
    if (!event.target.classList.contains('btn')) return;
    if (event.target.classList.contains('ac')) return;
    out.textContent = '';
    const key = event.target.textContent;
    if (digit.includes(key)){
        if (num1.length >= 7){
            num1 = num1.slice(0, 7);
        }
        if (num2.length >= 7){
            num2 = num2.slice(0, 7);
        }
        if (num2 === '' && oper === ''){
            num1 += key;
            out.textContent = TextOutput(num1);
        } else if (num1 !== '' && num2 !== '' && finish){
            num2 = key;
            finish = false;
            out.textContent = TextOutput(num2);
        } else{
            num2 += key;
            out.textContent = TextOutput(num2);
        }
    }

    if (action.includes(key)){
        ClearButtons();
        oper = key;
        switch (oper){
            case '+':
                document.getElementById("plus").style.backgroundColor= '#fff';
                document.getElementById("plus").style.color = '#FF9500';
                break;
            case '-':
                document.getElementById("minus").style.backgroundColor= '#fff';
                document.getElementById("minus").style.color = '#FF9500';
                break;
            case '/':
                document.getElementById("division").style.backgroundColor= '#fff';
                document.getElementById("division").style.color = '#FF9500';
                break;
            case 'x':
                document.getElementById("mult").style.backgroundColor= '#fff';
                document.getElementById("mult").style.color = '#FF9500';
                break;
        }
        if (num1 === ''){
            out.textContent = 0;
        } else{
            out.textContent = TextOutput(num1);
        }
    }
    if (key === '%' && num1 !== ''){
        num1 = ((+num1)/100).toPrecision(2);
        out.textContent = TextOutput(num1.toString());
    }
    if (key === '+/-' && (num1 !== '' || num1 !== '0')){
        num1 = -num1;
        out.textContent = TextOutput(num1.toString());
    }
    if (key === '='){
        if (num2 === '') num2 = num1;
        if (num1 === '' || oper === ''){
            out.textContent = 0;
        }
        switch (oper){
            case '+':
                num1 = (+num1) + (+num2);
                out.textContent = TextOutput(num1.toString());
                break;
            case '-':
                num1 = (+num1) - (+num2);
                out.textContent = TextOutput(num1.toString());
                break;
            case 'x':
                num1 = (+num1) * (+num2);
                out.textContent = TextOutput(num1.toPrecision(6).toString());
                break;
            case '/':
                if (num2 === '0'){
                    out.textContent = 'Error';
                    num1, num2, oper = '';
                    break;
                }
                num1 = (+num1) / (+num2);
                out.textContent = TextOutput(num1.toPrecision(6).toString());
                break;
        }
        finish = true;
        ClearButtons();
    }
}