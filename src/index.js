import {version} from "../package.json";
import jsonstat from "./jsonstat.js";

const responseJSON = resp => {
	if(!resp.ok){
		throw new Error(`${resp.status} ${resp.statusText}`);
	}
	return resp.json();
}

//1.4.0 typedArray
export default function JSONstat(input, init, typedArray) {
	const options=(typeof init==="object") ? init : { method: "GET" };

	if(typeof typedArray!=="function"){
		typedArray=null;
	}

	if(!typedArray && typeof init==="function"){
		typedArray=init;
	}

	if(typeof input==="object"){
		return new jsonstat(input, typedArray);
	}else{
		if(input==="version"){
			return version;
		}else if(fetch){
			return fetch(input, options)
				.then(responseJSON)
				.then(json => new jsonstat(json, typedArray))
				.catch(err => {
					throw err;
				});
		}
	}
}
