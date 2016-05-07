declare function require(name:string);
declare var __dirname;

(function () {
	var fs = require('fs');
	var path = require('path');
	var bf : string =fs.readFileSync(path.join(__dirname, './message.txt')).toString('utf-8');

	let result : Array<string> = [];
	let phraseSplit : Array<string> = bf.split('');
	let ret : Array<String> = [];
	let retString = '';
	let morseDict: Object = {
		'A': '.-',
		'B': '-...',
		'C': '-.-.',
		'D': '-..',
		'E': '.',
		'F': '..-.',
		'G': '--.',
		'H': '....',
		'I': '..',
		'J': '.---',
		'K': '-.-',
		'L': '.-..',
		'M': '--',
		'N': '-.',
		'O': '---',
		'P': '.--.',
		'Q': '--.-',
		'R': '.-.',
		'S': '...',
		'T': '-',
		'U': '..-',
		'V': '...-',
		'W': '.--',
		'X': '-..-',
		'Y': '-.--',
		'Z': '--..',
		'0': '-----',
		'1': '.----',
		'2': '..---',
		'3': '...--',
		'4': '....-',
		'5': '.....',
		'6': '-....',
		'7': '--...',
		'8': '---..',
		'9': '----.',
		',': '--..--',
		' ': '/'
	}

	phraseSplit.forEach(function (e, i) {
		if (e === '\n') {
			result.push('\n');
		} else {
			result.push(morseDict[e]);
		}
	});

	result.forEach(function (l, n) {
		let temp : Array<string> = l.split('');
		let tempVal : Array<Number> = [];
		if (l === '\n') {
			ret[n] = '\n';
			return;
		} else if (l == '/') {
			ret[n] = '/';
		} else {
			var dot : number = 0;
			var dash : number = 0;
			temp.forEach(function (e, i) {
				if (i !== 0 && e !== temp[i-1]) {
					if (ret[n] === undefined) {
						ret[n] = '';
					}
					if (dot > 0) {
						ret[n] += dot + '';
					}

					if (dash > 0) {
						ret[n] += String.fromCharCode(dash + 64);
					}
					dot = dash = 0;
				}

				if (e === '.') {
					dot += 1;
				}

				if (e === '-') {
					dash += 1;
				}


				if(i === temp.length-1) {
					if (ret[n] === undefined) {
						ret[n] = '';
					}
					if (dot > 0) {
						ret[n] += dot + '|';
					}

					if (dash > 0) {
						ret[n] += String.fromCharCode(dash + 64) + '|';
					}

					dot = dash = 0;
				}
			});
		};
	});

	ret.forEach(function (e, i) {
		if (ret[i+1] == '/' || ret[i+1] == '\n') {
			e = e.substr(0,e.length-1);
		}
		retString += e;
	});

	console.log(retString);

	return retString;
})();
