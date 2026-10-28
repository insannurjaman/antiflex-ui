
const available=(await figma.listAvailableFontsAsync()).map(f=>f.fontName);
for(const f of available.filter(f=>['DM Sans','Anybody','Space Mono'].includes(f.family)))await figma.loadFontAsync(f);
const page=await figma.getNodeByIdAsync('75:2593');await figma.setCurrentPageAsync(page);
const styles=await figma.getLocalTextStylesAsync();const errors=[];const groups={};const fields=TOKEN_DATA.primitives.typography;
for(const [group,entries] of [['scale',fields.size],['weight',fields.weight],['tracking',fields.tracking],['leading',fields.leading]]){
 groups[group]=Object.keys(entries).length;
 for(const [key,value] of Object.entries(entries)){
  const s=styles.find(s=>s.name==='antiflex / Type '+group+' / '+key);if(!s){errors.push('Missing '+group+'/'+key);continue;}
  if(group==='scale'&&(s.fontSize!==value||s.lineHeight.unit!=='PIXELS'||s.lineHeight.value!==fields['line-height'][key]||!s.boundVariables?.fontSize||!s.boundVariables?.lineHeight))errors.push('Scale '+key);
  if(group==='weight'&&(!s.boundVariables?.fontWeight||s.fontName.variationSettings?.wght!==value))errors.push('Weight '+key);
  if(group==='tracking'&&(s.letterSpacing.unit!=='PERCENT'||Math.abs(s.letterSpacing.value-value*100)>1e-6))errors.push('Tracking '+key);
  if(group==='leading'&&(s.lineHeight.unit!=='PERCENT'||s.lineHeight.value!==value*100))errors.push('Leading '+key);
 }
}
const boards=[];for(const id of ['75:2633','75:2719']){const b=await figma.getNodeByIdAsync(id);const text=b.findAllWithCriteria({types:['TEXT']});for(const t of text)if(!t.textStyleId)errors.push('Unstyled '+t.id);boards.push({id:b.id,width:b.width,height:b.height,mode:b.explicitVariableModes,textNodes:text.length});}
return {errors,groups,newStyles:styles.filter(s=>s.name.startsWith('antiflex / Type ')).length,totalTextStyles:styles.length,boards,unitBridge:'Sizes/default line-height bind pixel variables; leading ratios and tracking em are converted to Figma native percent styles. System serif is browser-provided.'};
