
let util = {}

/**
 * 返回精确的n位小数数值
 * @param data:number
 * @param type:string
 * 例：formatDate(1523440865000,yyyy-mm-dd) 得到 '2018-04-11'
 * 例：formatDate(1523440865000,yyyy-mm-dd hh:mm:ss) 得到 '2018-04-11 18:1:5'
*/

util.router_push = function(vm,path,data){
	if(data){
		vm.$router.push({
			name:path,
			query: {
				data: data
			}
		});
	}else{
		vm.$router.push({
			name:path
		});
	}
}
util.router_replace = function(vm,path,data){
	if(data){
		vm.$router.replace({
			name:path,
			query: {
				data: data
			}
		});
	}else{
		vm.$router.replace({
			name:path
		});
	}
}


function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

util.formatDate = function(date, type) {
	if(typeof(date) == 'string'){
		return date;
	}else{
		var year = date.getFullYear()
		var month = date.getMonth() + 1
		var day = date.getDate()

		var hour = date.getHours()
		var minute = date.getMinutes()
		var second = date.getSeconds()

		if (type === 'YYYY-MM-DD') {
		    return [year, month, day].map(formatNumber).join('-')
		} else {
		    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
		}
	}
}
/**
 * 返回 00:00 时间格式
 * @param times:number
 * timeToMinute(60) 得到 '01:00'
*/
util.timeToMinute = function(times){
	let result = '00:00:00';
	let hour,minute,second
	if (times > 0) {
		hour = Math.floor(times / 3600);
		if (hour < 10) {
			hour = "0"+hour;
		}
		minute = Math.floor((times - 3600 * hour) / 60);
		if (minute < 10) {
			minute = "0"+minute;
		}
		second = Math.floor((times - 3600 * hour - 60 * minute) % 60);
		if (second < 10) {
			second = "0"+second;
		}
		if (hour == '00') {
			result = minute+':'+second;
		} else if (minute == '00'){
			result = hour+':'+minute+':'+second;
		} else {
			result = second;
		}
	}
	return result;  
},
/**
 * 返回精确的n位小数数值
 * @param num:number
 * @param dig:number
 * 例：digitToFixed(123.666) 得到 '123.67'
*/

util.digitToFixed = function(num, digit = 2) {
    // NaN，undefined，空值
    if (typeof (num) === 'undefined') {
        return '0.00'
    } else {
        return parseFloat(num).toFixed(digit)
    }
}

/**
 * 返回账户金额，每隔三位数字添加一个逗号
 * @param str:string
 * 例：threeNumberAPointer(123456789) 得到 '123,456,789.00'
*/

util.threeNumberAPointer =  function(str) {
    return parseFloat(str).toFixed(2).replace(/\d(?=(?:\d{3})+\b)/g, `$&,`)
}


/**
 * 截取末尾n位数字截取出来
 *  @param words:string 截取字符串
 *  @param digit:num  截取长度
 * 例：getLastNum('123456789', digit = 4) 得到 '6789'
*/

util.getLastNum = function(words, digit = 4) {
    return words.substring(words.length - digit, words.length)
}


export default util;