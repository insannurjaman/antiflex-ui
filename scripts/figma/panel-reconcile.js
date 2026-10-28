const sources={};
for(const family of ['Sheet','Drawer']) {
  const set=page.children.find(n=>n.type==='COMPONENT_SET'&&n.name===family);
  if(!set)throw Error('Missing original panel family');
  sources[family]=set;
  const descKey=Object.keys(set.componentPropertyDefinitions).find(k=>k.startsWith('Description#'));
  const description=family==='Sheet'?'Review this local sample workspace.':'Choose the scope for your local sample export.';
  set.editComponentProperty(descKey,{defaultValue:description});mutatedNodeIds.push(set.id);
  for(const v of [...set.children]) {
    if(!v.name.includes('Viewport='))v.name+=', Viewport=Desktop';
    mutatedNodeIds.push(v.id);
    for(const f of v.findAllWithCriteria({types:['FRAME']})) {
      f.clipsContent=f.name==='Body / Scroll region';mutatedNodeIds.push(f.id);
      if(f.name==='Field')gap(f,2,map);
    }
    for(const t of v.findAllWithCriteria({types:['TEXT']})) {
      if(t.parent.type==='INSTANCE')continue;
      t.layoutSizingHorizontal='FILL';mutatedNodeIds.push(t.id);
      if(t.componentPropertyReferences?.characters===descKey)t.characters=description;
    }
    const footer=v.findOne(n=>n.type==='FRAME'&&n.name==='Footer / Persistent actions');
    for(const [i,b] of footer.children.entries()) {
      b.layoutSizingHorizontal='FIXED';
      b.resize(family==='Sheet'?(i===0?111:121):(i===0?120:153),32);
      mutatedNodeIds.push(b.id);
    }
  }
  for(const state of ['Default','Focus']) {
    if(!set.children.some(n=>n.name.endsWith('State='+state+', Viewport=Mobile'))) {
      const n=await panel(family,family==='Sheet'?'right':'bottom','md',state,'Mobile');
      set.appendChild(n);n.x=state==='Default'?24:1080;n.y=set.height+48;
      set.resize(set.width,n.y+n.height+48);
    }
  }
}
const removedNodeIds=[];
for(const id of ['70:449','70:515']) {
  const board=await figma.getNodeByIdAsync(id);
  const mobile=board.children.find(n=>n.name==='Mobile specimens');
  for(const child of [...mobile.children]){removedNodeIds.push(child.id);child.remove();}
  mutatedNodeIds.push(mobile.id);
  for(const family of ['Sheet','Drawer']) {
    const source=sources[family].children.find(n=>n.name.endsWith('Size=md, State=Focus, Viewport=Mobile'));
    const instance=remember(source.createInstance());mobile.appendChild(instance);
  }
}
return result({removedNodeIds,pageId:page.id,families:Object.values(sources).map(s=>({id:s.id,name:s.name,variants:s.children.length,properties:s.componentPropertyDefinitions})),reviews:['70:449','70:515'],variableCount:(await figma.variables.getLocalVariablesAsync()).length});
