var tokenize = require('c-tokenizer/array')
var getStdin = require('get-stdin')

getStdin().then(str => {

	var t = tokenize(str)

	var tabcounter = 0
	var tabincache = 0

	for (let token of t) {
		if(token.type == 'open curly'){
			tabcounter = tabcounter + 1
		}

		if(token.type == 'close curly'){
  			tabcounter = tabcounter - 1
		}
	
		if(token.type == 'whitespace'){
			var dest_code = ''
			var src_code = token.source
			var src_length = src_code.length

			var i = 0
			var j = 0

			var lastcharisnewline = 0

			for(i = 0; i < src_length; i++){
				if(src_code[i] == '\n'){
					lastcharisnewline = 1
	
					dest_code += '\n'
					var k = 0

					for(k = 0; k < tabcounter - 1; k++){
						dest_code += '\t'
					}

					if(tabcounter != 0){
						tabincache = 1
					}else{
						tabincache = 0
					}
				}else{
					if(lastcharisnewline == 0){
						dest_code += src_code[i]
					}
				}
			}

			process.stdout.write(dest_code)
		}else{
			if(token.type != 'close curly' && tabincache == 1){
				process.stdout.write('\t')
			}
			tabincache = 0
			process.stdout.write(token.source)
		}
	}
})
