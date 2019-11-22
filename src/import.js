import {version} from "../package.json";
import jsonstat from "./jsonstat.js";


function responseJSON(resp) {
  if(!resp.ok){
    throw new Error(resp.status + " " + resp.statusText);
  }
  return resp.json();
}

export default function JSONstat(input, init) {
  if(typeof input==="object"){
    return new jsonstat(input);
  }else{
		if(input==="version"){
			return version;
		}else if(fetch){ //For iife and IE
			return fetch(input, init).then(responseJSON).then(function(json){
	      return new jsonstat(json);
	    });
		}
  }
}
