const page=await figma.getNodeByIdAsync('70:11');await figma.setCurrentPageAsync(page);
const errors=[],families=[];
for(const id of ['70:360','70:448']) {
 const set=await figma.getNodeByIdAsync(id);
 const variants=[];
 for(const n of set.children) {
   const body=n.findOne(c=>c.type==='FRAME'&&c.name==='Body / Scroll region');
   const footer=n.findOne(c=>c.type==='FRAME'&&c.name==='Footer / Persistent actions');
   const field=body.findOne(c=>c.type==='FRAME'&&c.name==='Field');
   const mobile=n.name.includes('Viewport=Mobile');
   if(footer.layoutMode!==(mobile?'VERTICAL':'HORIZONTAL'))errors.push(n.id+': footer direction');
   for(const c of footer.children)if(c.x<0||c.x+c.width>footer.width+1)errors.push(c.id+': action overflow');
   if(field.clipsContent)errors.push(field.id+': clipped focus outline');
   for(const t of n.findAllWithCriteria({types:['TEXT']}))if(!t.textStyleId)errors.push(t.id+': missing text style');
   if(!n.boundVariables?.fills)errors.push(n.id+': missing surface binding');
   variants.push({id:n.id,name:n.name,width:n.width,height:n.height,footer:{id:footer.id,width:footer.width,height:footer.height,direction:footer.layoutMode},body:{id:body.id,height:body.height,clipsContent:body.clipsContent}});
 }
 families.push({id:set.id,name:set.name,count:variants.length,variants});
}
const collections=await figma.variables.getLocalVariableCollectionsAsync();
const variables=await figma.variables.getLocalVariablesAsync();
const own=variables.filter(v=>/^component\/(sheet|drawer)-/.test(v.name));
for(const v of own){if(v.scopes.includes('ALL_SCOPES')||!v.codeSyntax.WEB?.startsWith('var('))errors.push(v.id+': token metadata');}
return {pageId:page.id,errors,variableCount:variables.length,panelVariables:own.map(v=>({id:v.id,name:v.name,values:v.valuesByMode,scopes:v.scopes,syntax:v.codeSyntax})),families,reviews:await Promise.all(['70:449','70:515'].map(async id=>{const n=await figma.getNodeByIdAsync(id);return {id:n.id,name:n.name,width:n.width,height:n.height,explicitModes:n.explicitVariableModes};})),semanticModes:collections.find(c=>c.name==='antiflex / Semantic').modes};
