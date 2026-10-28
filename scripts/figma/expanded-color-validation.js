
await fonts();const page=await figma.getNodeByIdAsync('75:676');await figma.setCurrentPageAsync(page);
const vars=await figma.variables.getLocalVariablesAsync();const map=new Map(vars.map(v=>[v.name.replaceAll('/','.'),v]));const errors=[];let checked=0,maxNumericError=0;
function equal(a,b){if(typeof b==='number'){const delta=Math.abs(a-b);maxNumericError=Math.max(maxNumericError,delta);return Number.isFinite(a)&&delta<=1e-6;}if(b&&typeof b==='object')return Object.keys(b).every(k=>equal(a?.[k],b[k]));return a===b;}
for(const [key,value] of flatten({palette:TOKEN_DATA.primitives.palette,typography:TOKEN_DATA.primitives.typography,font:{serif:TOKEN_DATA.primitives.font.serif}})){
 const v=map.get(key);if(!v){errors.push('Missing '+key);continue;}checked++;
 if(v.codeSyntax.WEB!==cssName(key)||v.scopes.includes('ALL_SCOPES'))errors.push('Metadata '+key);
 const actual=Object.values(v.valuesByMode)[0],expected=key.startsWith('palette.')?REFERENCE_SRGB[key]:value;
 if(!equal(actual,expected))errors.push('Value '+key);
}
const boards=[];for(const id of ['75:677','75:1635']){const board=await figma.getNodeByIdAsync(id);const swatches=board.findAllWithCriteria({types:['RECTANGLE']});for(const s of swatches)if(!s.boundVariables?.fills)errors.push('Unbound swatch '+s.id);boards.push({id:board.id,width:board.width,height:board.height,swatches:swatches.length,mode:board.explicitVariableModes});}
return {errors,checkedVariables:checked,totalVariables:vars.length,numericTolerance:1e-6,maxNumericError,boards};