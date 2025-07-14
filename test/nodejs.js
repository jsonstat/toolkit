const 
  JSONstat = require("../main.cjs"),
  definitions = require("./definitions/nodejs.js"),
  iterateTests = (tests, J, context) => {
	let ok = true;
	tests.forEach(d => {
	  const 
		real = d.real(J, context),
		passed = real === d.exp,
		t = passed
		  ? "\x1b[32mPassed\x1b[0m"
		  : "\x1b[31mNot passed!\x1b[0m"
	  ;
	  
	  console.log(`${d.text}: ${real} (${t})`);
	  if (!passed) {
		ok = false;
	  }
	});
	return ok;
  }
;

console.log(`Running jsonstat-toolkit v. ${JSONstat("version")} test...`);

(async () => {
  let allTestsPassed = true;

  for (const def of definitions) {
	const J = await JSONstat(def.url, typeof def.type!== "undefined" ? def.type : null);
	let context = {};
	if (def.setup) {
	  context = def.setup(J);
	}
	const testsPassed = iterateTests(def.tests, J, context);
	if (!testsPassed) {
	  allTestsPassed = false;
	}
  }

  console.log(
	allTestsPassed
	  ? "\n\x1b[32mALL TESTS WERE SUCCESSFULLY PASSED\x1b[0m.\n"
	  : "\n\x1b[31mWARNING: SOME TEST FAILED!\x1b[0m\n"
  );

})();
