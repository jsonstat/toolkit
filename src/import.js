import {version} from "../package.json";
import jsonstat from "./jsonstat.js";


function responseJSON(resp) {
  if(!resp.ok){
    throw new Error(resp.status + " " + resp.statusText);
  }
  return resp.json();
}

//1.4.0 typedArray
export default function JSONstat(input, init, typedArray) {
  var options=(typeof init==="object") ? init : null;

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
		}else if(fetch){ //For iife and IE
			return fetch(input, options).then(responseJSON).then(function(json){
	      return new jsonstat(json, typedArray);
	    });
		}
  }
}
