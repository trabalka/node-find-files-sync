'use strict'
const {statSync,readdirSync} = require('fs')
const {sep,resolve} = require('path')

module.exports = function findFiles(paths, file_filter) {
	if(typeof file_filter=='string') file_filter = new RegExp(file_filter.replace(/([.])/g,'\\$1').replace(/\*/g,".+"))
	if(file_filter instanceof RegExp) file_filter = file_filter.test.bind(file_filter)
	else if(typeof file_filter!='function') file_filter = function(){ return true }
	if(paths===undefined || paths===null) return []
	if(!Array.isArray(paths)) paths = [paths]
	const files = new Set()
	for(let path of paths){
		path = resolve(path).replace(/^(\w:)\\/,'$1')
		try{
			const st = statSync(path)
			if(st.isFile()){
				if(file_filter(path)) files.add(path)
			}else if(st.isDirectory()){
				findFilesInDirectory(path, file_filter, files)
			}
		}catch(e){
		}
	}
	return [...files].sort()
}

function findFilesInDirectory(abs_dir, file_filter, files){
	try{
		const items = readdirSync(abs_dir)
		for(let item of items){
			const path = abs_dir+sep+item
			try{
				const st = statSync(path)
				if(st.isFile()){
					if(file_filter(path)) files.add(path)
				}else if(st.isDirectory()){
					findFilesInDirectory(path, file_filter, files)
				}
			}catch(e){}
		}
	}catch(e){}
}
