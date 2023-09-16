require('dotenv').config();
var fs = require('fs');
const uniqid = require('uniqid');
const bcrypt = require('bcrypt');
const ejs = require('ejs');
const numeral = require('numeral');
const moment = require('moment');
const md5 = require('md5');

const dotenvIsTrue = (val) =>{
    if(val.toLowerCase()=='false') return false;
    else if(val.toLowerCase()=='true') return true;
    else if(val.toLowerCase()=='1') return true;
    else if(val.toLowerCase()=='0') return false;
}

const isEmpty = (val)=>{
    if(typeof val === 'object' && val !== null){
        if(Array.isArray(val)){
            return val.length===0?true:false;
        }else{
            return Object.keys(val).length===0?true:false;
        }
    }
    if(val==null || Object.is(val, NaN) || val ==undefined || Object.is(val, null) ) return true;
    else if(val.toString().trim().length ==0) return true;
    else return false;
}

const readFile = async function(filePath){
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}
const createFile = async(filePath,data)=>{
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data , function(err) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}


const cipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);

    return text => text.split('')
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join('');
}

const decipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
    return encoded => encoded.match(/.{1,2}/g)
        .map(hex => parseInt(hex, 16))
        .map(applySaltToChar)
        .map(charCode => String.fromCharCode(charCode))
        .join('');
}


const hostname = (url) =>{
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];
    hostname = hostname.replace('www.','');

    return hostname;
}

const alphaNumeric = (val)=>{
    return val.replace(/[^a-z0-9|\s]/gi,'');
}
const basicSanitize = (val)=>{
    return val.replace(/[^a-z0-9|\s|\-|_|\.]/gi,'');
}

const randomStr = async()=>{
    //let unique_id = await bcrypt.hash(uniqid(),10);
    return md5(uniqid()).substr(-16);//uniqid();//unique_id.replace(/[^a-z|0-9]*/ig,'').substr(-30);
}

const EjsTpl = async(tpl,data)=>{
    const html = fs.readFileSync(__dirname+`/views/${tpl}.ejs`, 'utf-8');
    return ejs.render(html, data);
    
}

const format={
    date:(date)=>{
        return moment(date).format('DD-MM-YYYY');
    },
    datetime:(date)=>{
        return moment(date).format('DD MMM, YYYY h:mm:ss a');
    },
    durationUntilNow:(seconds)=>{
        let year = Math.floor(seconds/31536000);
        seconds = seconds % 31536000;
        let minute = Math.floor(seconds / 60);
        seconds = seconds % 60;
        let hour = Math.floor(minute / 60);
        minute = minute % 60;
        let day = Math.floor(hour / 24);
        hour = hour % 24;
        let str = '';
        str += (year>0)?year.toString().padStart(2,'0')+'Y ':'';
        str += (day>0)?day.toString().padStart(2,'0')+'D ':'';
        str += (hour>0)?hour.toString().padStart(2,'0')+':':'00:';
        str += (minute>0)?minute.toString().padStart(2,'0')+':':'00:';
        str += (seconds>0)?seconds.toString().padStart(2,'0')+'':'00';
        return str
    },
    seconds:(seconds)=>{
        let year = Math.floor(seconds/31536000);
        seconds = seconds % 31536000;
        let minute = Math.floor(seconds / 60);
        seconds = seconds % 60;
        let hour = Math.floor(minute / 60);
        minute = minute % 60;
        let day = Math.floor(hour / 24);
        hour = hour % 24;
        let str = '';
        str += (year>0)?year.toString().padStart(2,'0')+'Y ':'';
        str += (day>0)?day.toString().padStart(2,'0')+'D ':'';
        str += (hour>0)?hour.toString().padStart(2,'0')+':':'00:';
        str += (minute>0)?minute.toString().padStart(2,'0')+':':'00:';
        str += (seconds>0)?seconds.toString().padStart(2,'0')+'':'00';
        return str
    },
    time:(date)=>{
        return moment(date).format('h:mm:ss a');
    },
    MM_YYYY:(date)=>{
        return  moment(date).format('MMMM, YYYY');
    },
    MONTH_DD_YY:(date)=>{
        return  moment(date).format('LL');
    },
    currency:(val)=>{
        return numeral( val ).format('$0,0.00');
    },
    unitPrice:(val)=>{
        return numeral( val ).format('$0,0.0000');
    }
}

const dateFn = {
    utcNow:()=>{
        return moment().utc();
    },
    diffInDays:(start,end)=>{
        d1 = moment(start);
        d2 = moment(end);       
        return d2.diff(d1, 'days')
    },
    diffInMonths:(start,end)=>{
        d1 = moment(start);
        d2 = moment(end);       
        return d2.diff(d1, 'months')
    },
    isFutureDate:(date)=>{
        const d = moment(date);
        if(d.isValid()){
            if(dateFn.diffInDays(new Date(),date) > 0)
                return true;
        }
        return false;
    },
    daysDiff:(sdate,edate)=>{
        const sd = moment(sdate);
        if(sd.isValid()){
            return dateFn.diffInDays(sdate,edate)
        }
        return false;
    },
    dateInBetween:(start_date,end_date,date)=>{
        st = moment(start_date)
        et = moment(end_date);
        dt = moment(date);
        return dt.isBetween(st,et);
    },
    // unique day range
    getDayRange:(start_date,end_date)=>{
        const startDate = moment(start_date, 'YYYY-M-DD');
        const endDate = moment(end_date, 'YYYY-M-DD');

        let months = new Map();
        const flag = startDate;
        while (flag.diff(endDate) <= 0) {
            months.set(flag.format('DD'),parseInt(flag.format('DD')));
            flag.add(1, 'd');
        }
        return Array.from(months.values());
    },
    // unique months range
    getMonthsRange:(start_date,end_date)=>{
        const startDate = moment(start_date, 'YYYY-M-DD');
        const endDate = moment(end_date, 'YYYY-M-DD');

        let months = new Map();
        const flag = startDate;
        while (flag.diff(endDate) <= 0) {
            months.set(flag.format('M'),parseInt(flag.format('M')));
            flag.add(1, 'M');
        }
        return Array.from(months.values());
    },
    // unique year range
    getYearsRange:(start_date,end_date)=>{
        const startDate = moment(start_date, 'YYYY-M-DD');
        const endDate = moment(end_date, 'YYYY-M-DD');

        let years = new Map();
        const flag = startDate;
        while (flag.diff(endDate) <= 0) {
            years.set(flag.format('YYYY'),parseInt(flag.format('YYYY')));
            flag.add(1, 'M');
        }
        return Array.from(years.values());
    },
    parse:(date)=> moment(date),
}

module.exports = {
    isEmpty,
    createFile,
    cipher,
    decipher,
    hostname,
    basicSanitize,
    randomStr,
    dotenvIsTrue,
    EjsTpl,
    format,
    dateFn
}