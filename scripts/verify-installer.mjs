import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync, spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const root = path.resolve(import.meta.dirname, '..');
const require = createRequire(import.meta.url);
function run(command, args, cwd = root) {
  const result = spawnSync(command, args, { cwd, stdio: 'inherit' });
  if (result.error || result.status !== 0) throw Error(command + ' ' + args.join(' ') + ' failed');
}
const consumer = fs.mkdtempSync(path.join(os.tmpdir(), 'antiflex-react-consumer-'));
const packageVersion = (p) => JSON.parse(fs.readFileSync(p, 'utf8')).version;
const docs = JSON.parse(fs.readFileSync(path.join(root, 'apps/docs/package.json'), 'utf8'));
const fromRegistry = process.argv.includes('--registry');
if (!fromRegistry) run('pnpm', ['installer:pack']);
const installer = JSON.parse(fs.readFileSync(path.join(root, 'packages/cli/package.json'), 'utf8'));
const tarball = path.join(
  root,
  'artifacts',
  installer.name.replace('@', '').replace('/', '-') + '-' + installer.version + '.tgz',
);
const manifest = {
  name: 'antiflex-independent-consumer',
  private: true,
  type: 'module',
  packageManager: 'pnpm@10.34.3',
  scripts: { build: 'vite build' },
  dependencies: { react: docs.dependencies.react, 'react-dom': docs.dependencies['react-dom'] },
  devDependencies: {
    [installer.name]: fromRegistry ? installer.version : 'file:' + tarball,
    vite: packageVersion(path.join(root, 'apps/storybook/node_modules/vite/package.json')),
    typescript: require('typescript/package.json').version,
    tailwindcss: docs.devDependencies.tailwindcss,
    '@tailwindcss/postcss': docs.devDependencies['@tailwindcss/postcss'],
    '@types/react': packageVersion(
      path.join(root, 'packages/ui/node_modules/@types/react/package.json'),
    ),
    '@types/react-dom': packageVersion(
      path.join(root, 'packages/ui/node_modules/@types/react-dom/package.json'),
    ),
  },
};
fs.mkdirSync(path.join(consumer, 'src'), { recursive: true });
fs.writeFileSync(path.join(consumer, 'package.json'), JSON.stringify(manifest, null, 2));
// This disposable app deliberately changes dependencies during init, including in CI.
// Keep the repository's frozen lockfile policy; allow only this consumer to update its lock.
fs.writeFileSync(path.join(consumer, '.npmrc'), 'frozen-lockfile=false\n');
fs.writeFileSync(
  path.join(consumer, 'index.html'),
  '<html lang="en"><head><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Independent antiflex consumer</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>',
);
fs.writeFileSync(
  path.join(consumer, 'src/index.css'),
  "@import 'tailwindcss';\nbody{margin:0;font-family:var(--af-font-sans),sans-serif;color:var(--af-semantic-foreground);background:var(--af-semantic-canvas)}*{box-sizing:border-box}\n",
);
fs.writeFileSync(
  path.join(consumer, 'postcss.config.mjs'),
  "export default {plugins:{'@tailwindcss/postcss':{}}};\n",
);
fs.writeFileSync(
  path.join(consumer, 'vite.config.mjs'),
  "export default {esbuild:{jsx:'automatic',jsxImportSource:'react'}};\n",
);
fs.writeFileSync(
  path.join(consumer, 'tsconfig.json'),
  JSON.stringify(
    {
      compilerOptions: {
        target: 'ES2022',
        lib: ['ES2022', 'DOM', 'DOM.Iterable'],
        module: 'ESNext',
        moduleResolution: 'Bundler',
        jsx: 'react-jsx',
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noEmit: true,
        skipLibCheck: true,
        allowImportingTsExtensions: true,
      },
      include: ['src'],
    },
    null,
    2,
  ),
);
fs.writeFileSync(
  path.join(consumer, 'src/main.tsx'),
  `import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from './components/antiflex/button';
import { TextField } from './components/antiflex/text-field';
import { Badge } from './components/antiflex/badge';
import { Card } from './components/antiflex/card';
import { Separator } from './components/antiflex/separator';
import { Skeleton } from './components/antiflex/skeleton';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from './components/antiflex/table';
import { AppShell } from './components/antiflex/app-shell';
import { Input } from './components/antiflex/input';
import { Label } from './components/antiflex/label';
import { Field, FieldSet, FieldLegend } from './components/antiflex/field';
import { Textarea } from './components/antiflex/textarea';
import { NativeSelect } from './components/antiflex/native-select';
import { Checkbox } from './components/antiflex/checkbox';
import { Switch } from './components/antiflex/switch';
import { RadioGroup } from './components/antiflex/radio-group';
import { InputGroup, InputGroupAddon } from './components/antiflex/input-group';
import { ButtonGroup } from './components/antiflex/button-group';
import { Alert } from './components/antiflex/alert';
import { Avatar } from './components/antiflex/avatar';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from './components/antiflex/breadcrumb';
import { Empty } from './components/antiflex/empty';
import { Kbd, KbdGroup } from './components/antiflex/kbd';
import { Pagination, PaginationContent, PaginationItem, PaginationButton } from './components/antiflex/pagination';
import { Progress } from './components/antiflex/progress';
import { Spinner } from './components/antiflex/spinner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/antiflex/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/antiflex/accordion';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './components/antiflex/collapsible';
import { Toggle } from './components/antiflex/toggle';
import { ToggleGroup, ToggleGroupItem } from './components/antiflex/toggle-group';
import { Typography } from './components/antiflex/typography';
import { AspectRatio } from './components/antiflex/aspect-ratio';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from './components/antiflex/dialog';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from './components/antiflex/alert-dialog';
import { Popover, PopoverTrigger, PopoverContent, PopoverTitle, PopoverDescription, PopoverClose } from './components/antiflex/popover';
import { Tooltip, TooltipTrigger, TooltipContent } from './components/antiflex/tooltip';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetBody, SheetFooter, SheetClose } from './components/antiflex/sheet';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter, DrawerClose } from './components/antiflex/drawer';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger } from './components/antiflex/dropdown-menu';
import { ToastProvider, ToastViewport, useToast } from './components/antiflex/toast';
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from './components/antiflex/context-menu';
import { HoverCard, HoverCardTrigger, HoverCardToggle, HoverCardContent, HoverCardTitle } from './components/antiflex/hover-card';
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from './components/antiflex/menubar';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from './components/antiflex/navigation-menu';
import { Select } from './components/antiflex/select';
import { Combobox } from './components/antiflex/combobox';
import { Command } from './components/antiflex/command';
import { Calendar } from './components/antiflex/calendar';
import { DatePicker } from './components/antiflex/date-picker';
import './index.css';
function ConsumerExpansion(){const [result,setResult]=useState('No workspace action');const [day,setDay]=useState('2026-10-23');const options=[{value:'alex',label:'Alex Morgan'},{value:'sam',label:'Sam Rivera',keywords:['react']}];return <section aria-label="Installed workspace tools" className="space-y-4"><h2>Workspace tools</h2>
<HoverCard><HoverCardTrigger href="#main-content">Consumer member</HoverCardTrigger><HoverCardToggle>Preview consumer member</HoverCardToggle><HoverCardContent><HoverCardTitle>Installed member profile</HoverCardTitle><p>Supplemental synthetic profile.</p></HoverCardContent></HoverCard>
<Menubar aria-label="Consumer commands"><MenubarMenu value="file"><MenubarTrigger>File</MenubarTrigger><MenubarContent aria-label="Consumer file"><MenubarItem onSelect={()=>setResult('Consumer project created')}>Create consumer project</MenubarItem></MenubarContent></MenubarMenu></Menubar>
<NavigationMenu aria-label="Consumer resources"><NavigationMenuList><NavigationMenuItem value="learn"><NavigationMenuTrigger>Consumer learn</NavigationMenuTrigger><NavigationMenuContent><NavigationMenuLink href="#main-content">Consumer guide</NavigationMenuLink></NavigationMenuContent></NavigationMenuItem></NavigationMenuList></NavigationMenu>
<form onSubmit={e=>{e.preventDefault();const d=new FormData(e.currentTarget);setResult('Choices: '+d.get('priority')+' / '+d.get('reviewer')+' / '+d.get('due'));}} className="space-y-4"><Field label="Consumer priority"><Select name="priority" options={options} defaultValue="alex" required/></Field><Field label="Consumer reviewer"><Combobox name="reviewer" options={options} required/></Field><Field label="Consumer due"><DatePicker name="due" label="Consumer due" defaultValue="2026-10-23" today="2026-10-23" required/></Field><Button type="submit">Submit workspace choices</Button><Button type="reset">Reset workspace choices</Button></form>
<Calendar value={day} onValueChange={setDay} today="2026-10-23"/>
<Command label="Consumer action search" items={[{value:'create',label:'Create installed project',onSelect:()=>setResult('Installed command complete')}]}/><p role="status" aria-label="Consumer workspace result">{result}</p></section>}
function ConsumerToast(){ const {toast}=useToast();return <><Button onClick={()=>toast({title:'Consumer notification',action:{label:'Undo consumer action',onAction:()=>{}}})}>Notify consumer</Button><ToastViewport layout="inline"/></>}
function App() {
 const [name,setName]=useState('');const [saved,setSaved]=useState('');const [dark,setDark]=useState(false);
 return <AppShell header={<><strong>Independent React app</strong><Button variant="secondary" onClick={()=>{document.documentElement.dataset.theme=dark?'light':'dark';setDark(!dark);}}>{dark?'Light theme':'Dark theme'}</Button></>} sidebar={<nav aria-label="Project navigation"><a href="#main-content">Overview</a></nav>}>
  <div className="mx-auto max-w-3xl space-y-6"><h1 className="text-3xl font-medium">antiflex in a fresh project</h1><p className="text-muted">Installed from the packed CLI. No workspace imports.</p>
  <Card><div className="space-y-4"><Badge variant="success">Source-owned</Badge><TextField label="Project name" value={name} onChange={event=>setName(event.target.value)}/><Button onClick={()=>setSaved('Saved '+name)}>Save project</Button><p role="status">{saved}</p></div></Card>
  <Separator decorative={false}/><Table><TableCaption>Sample projects</TableCaption><TableHeader><TableRow><TableHead>Project</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>Orbit</TableCell><TableCell><Badge variant="success">Active</Badge></TableCell></TableRow></TableBody></Table>
  <DropdownMenu><DropdownMenuTrigger>Consumer actions</DropdownMenuTrigger><DropdownMenuContent aria-label="Consumer actions"><DropdownMenuItem onSelect={()=>setSaved('Consumer menu action')}>Duplicate</DropdownMenuItem><DropdownMenuSub><DropdownMenuSubTrigger>Export</DropdownMenuSubTrigger><DropdownMenuContent aria-label="Consumer export"><DropdownMenuItem onSelect={()=>setSaved('Consumer JSON selected')}>JSON</DropdownMenuItem></DropdownMenuContent></DropdownMenuSub></DropdownMenuContent></DropdownMenu>
  <ContextMenu><ContextMenuTrigger role="region" aria-label="Consumer context">Sample project context</ContextMenuTrigger><ContextMenuContent aria-label="Consumer context actions"><ContextMenuItem onSelect={()=>setSaved('Consumer context action')}>Pin project</ContextMenuItem></ContextMenuContent></ContextMenu>
  <ToastProvider><ConsumerToast/></ToastProvider><ConsumerExpansion/>
  <h2>Native form controls</h2><form aria-label="Consumer preferences" onSubmit={event=>{event.preventDefault();const data=new FormData(event.currentTarget);setSaved('Preferences: '+data.get('contact')+' / '+data.get('visibility'));}}><FieldSet><FieldLegend>Preferences</FieldLegend><Field label="Contact email" required><Input name="contact" type="email" defaultValue="alex@example.com" /></Field><Label htmlFor="consumer-notes">Notes</Label><Textarea id="consumer-notes" name="notes" rows={2}/><Field label="Timezone"><NativeSelect name="timezone"><option>Jakarta</option><option>UTC</option></NativeSelect></Field><Field label="Updates"><Checkbox name="updates" defaultChecked /></Field><Field label="Notifications"><Switch name="notifications" /></Field><RadioGroup label="Visibility" name="visibility" defaultValue="team" options={[{value:'team',label:'Team'},{value:'private',label:'Private'}]}/><Field label="Website"><InputGroup><InputGroupAddon id="consumer-prefix">https://</InputGroupAddon><Input name="website" aria-describedby="consumer-prefix"/></InputGroup></Field></FieldSet><ButtonGroup aria-label="Consumer preference actions"><Button type="submit">Save preferences</Button><Button type="reset" variant="secondary">Reset preferences</Button></ButtonGroup></form>
<section aria-label="Independent feedback components" className="space-y-6"><h2>Feedback and navigation</h2>
 <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="#main-content">Workspace</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator/><BreadcrumbItem><BreadcrumbPage>Feedback</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
 <div className="flex items-center gap-3"><Avatar alt="Alex Morgan"/><KbdGroup aria-label="Control plus K"><Kbd>Ctrl</Kbd><span aria-hidden="true">+</span><Kbd>K</Kbd></KbdGroup></div>
 <Alert title="Ready for review" variant="success">These components came from the packed installer.</Alert>
 <Progress value={64} aria-label="Consumer import"/><Spinner label="Loading sample content"/>
 <Tabs defaultValue="overview"><TabsList aria-label="Consumer sections"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="details">Details</TabsTrigger></TabsList><TabsContent value="overview"><Empty title="No sample projects" description="Create a project to get started."/></TabsContent><TabsContent value="details"><Typography size="sm"><h3>Editable source</h3><p>Shared tokens and <strong>native behavior</strong>.</p></Typography></TabsContent></Tabs>
 <Accordion defaultValue={['license']} headingLevel={3}><AccordionItem value="license"><AccordionTrigger>Consumer license</AccordionTrigger><AccordionContent>The core is MIT licensed.</AccordionContent></AccordionItem><AccordionItem value="source"><AccordionTrigger>Consumer source</AccordionTrigger><AccordionContent>Editable React source in this independent app.</AccordionContent></AccordionItem></Accordion>
 <Collapsible><CollapsibleTrigger>Consumer advanced details</CollapsibleTrigger><CollapsibleContent>Optional details remain mounted while hidden.</CollapsibleContent></Collapsible>
 <Toggle aria-label="Consumer bold">Bold</Toggle><ToggleGroup type="multiple" aria-label="Consumer formatting"><ToggleGroupItem value="bold">Bold</ToggleGroupItem><ToggleGroupItem value="italic">Italic</ToggleGroupItem></ToggleGroup>
 <Pagination aria-label="Consumer pages"><PaginationContent><PaginationItem><PaginationButton isActive aria-label="Page 1">1</PaginationButton></PaginationItem><PaginationItem><PaginationButton disabled aria-label="Next page">Next</PaginationButton></PaginationItem></PaginationContent></Pagination>
 <AspectRatio ratio={16/9}><div style={{width:'100%',height:'100%',background:'var(--af-semantic-inset)',display:'grid',placeItems:'center'}}>Geometric media placeholder</div></AspectRatio>
 <Sheet><SheetTrigger>Consumer sheet</SheetTrigger><SheetContent><SheetHeader><SheetTitle>Consumer edge task</SheetTitle></SheetHeader><SheetBody><p>Installed edge panel.</p></SheetBody><SheetFooter><SheetClose>Close consumer sheet</SheetClose></SheetFooter></SheetContent></Sheet>
 <Drawer><DrawerTrigger>Consumer drawer</DrawerTrigger><DrawerContent><DrawerHeader><DrawerTitle>Consumer bottom task</DrawerTitle></DrawerHeader><DrawerBody><p>Installed bottom panel.</p></DrawerBody><DrawerFooter><DrawerClose>Close consumer drawer</DrawerClose></DrawerFooter></DrawerContent></Drawer>
 <Popover><PopoverTrigger>Consumer panel</PopoverTrigger><PopoverContent><PopoverTitle>Consumer floating task</PopoverTitle><PopoverDescription>Installed original positioning.</PopoverDescription><PopoverClose>Close consumer panel</PopoverClose></PopoverContent></Popover>
 <Tooltip><TooltipTrigger>Consumer project ID</TooltipTrigger><TooltipContent>A supplemental identifier explanation.</TooltipContent></Tooltip>
 <Dialog><DialogTrigger>Consumer edit dialog</DialogTrigger><DialogContent><DialogHeader><DialogTitle>Consumer modal task</DialogTitle><DialogDescription>Installed native modal source.</DialogDescription></DialogHeader><DialogFooter><DialogClose>Close consumer task</DialogClose></DialogFooter></DialogContent></Dialog>
 <AlertDialog><AlertDialogTrigger>Consumer confirmation</AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Consumer confirmation task</AlertDialogTitle><AlertDialogDescription>Choose whether to proceed.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel consumer change</AlertDialogCancel><AlertDialogAction>Apply consumer change</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
 </section>
  <div role="status" aria-label="Loading example"><Skeleton style={{width:160,height:16}}/></div></div>
 </AppShell>;
}
createRoot(document.getElementById('root')!).render(<App/>);
`,
);
run('pnpm', ['install'], consumer);
run('pnpm', ['exec', 'antiflex', 'init', '--css', 'src/index.css'], consumer);
run('pnpm', ['exec', 'antiflex', 'add', '--all'], consumer);
run('pnpm', ['exec', 'antiflex', 'add', 'app-shell'], consumer); // idempotent packed execution
run('pnpm', ['exec', 'tsc', '--noEmit'], consumer);
run('pnpm', ['build'], consumer);
const server = spawn(
  path.join(consumer, 'node_modules/.bin/vite'),
  ['preview', '--host', '127.0.0.1', '--port', '4175', '--strictPort'],
  { cwd: consumer, stdio: 'pipe' },
);
let browser;
try {
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      if ((await fetch('http://127.0.0.1:4175')).ok) break;
    } catch {}
    if (attempt === 99) throw Error('Consumer preview did not start');
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('http://127.0.0.1:4175');
  await expect(page.getByRole('heading', { name: 'antiflex in a fresh project' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Project name' }).fill('Orbit');
  await page.getByRole('button', { name: 'Save project' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Saved Orbit' })).toBeVisible();
  // Exercise the full catalog for both tarball and registry installations.
  {
    await page.getByRole('button', { name: 'Preview consumer member', exact: true }).click();
    await expect(page.getByRole('region', { name: 'Installed member profile' })).toBeVisible();
    await page.keyboard.press('Escape');
    await page
      .getByRole('menubar', { name: 'Consumer commands' })
      .getByRole('menuitem', { name: 'File', exact: true })
      .press('ArrowDown');
    await page
      .getByRole('menuitem', { name: 'Create consumer project', exact: true })
      .press('Enter');
    const result = page.getByRole('status', { name: 'Consumer workspace result' });
    await expect(result).toHaveText('Consumer project created');
    await page.getByRole('button', { name: 'Consumer learn', exact: true }).click();
    await expect(page.getByRole('link', { name: 'Consumer guide', exact: true })).toBeVisible();
    await page.keyboard.press('Escape');
    const reviewer = page.getByRole('combobox', { name: 'Consumer reviewer', exact: true });
    await reviewer.click();
    await reviewer.fill('react');
    await reviewer.press('Enter');
    await page.getByRole('button', { name: 'Submit workspace choices', exact: true }).click();
    await expect(result).toHaveText('Choices: alex / sam / 2026-10-23');
    await page.getByRole('button', { name: 'Reset workspace choices', exact: true }).click();
    await expect(reviewer).toHaveValue('');
    await page
      .getByRole('combobox', { name: 'Consumer action search', exact: true })
      .fill('create');
    await page.keyboard.press('Enter');
    await expect(result).toHaveText('Installed command complete');
    const date = page.getByRole('button', { name: 'Saturday, October 24, 2026', exact: true });
    await date.click();
    await expect(date.locator('..')).toHaveAttribute('aria-selected', 'true');
    await page.getByRole('button', { name: 'Notify consumer', exact: true }).click();
    await expect(
      page.getByRole('group', { name: 'Consumer notification', exact: true }),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Undo consumer action', exact: true }).click();
    await expect(
      page.getByRole('group', { name: 'Consumer notification', exact: true }),
    ).toBeHidden();
    await page.getByRole('textbox', { name: 'Contact email' }).fill('insan@example.com');
    await page.getByRole('radio', { name: 'Private', exact: true }).check();
    await page.getByRole('switch', { name: 'Notifications', exact: true }).focus();
    await page.keyboard.press('Space');
    await expect(page.getByRole('switch', { name: 'Notifications', exact: true })).toBeChecked();
    await page.getByRole('button', { name: 'Save preferences', exact: true }).click();
    await expect(
      page.getByRole('status').filter({ hasText: 'Preferences: insan@example.com / private' }),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Reset preferences' }).click();
    await expect(page.getByRole('textbox', { name: 'Contact email' })).toHaveValue(
      'alex@example.com',
    );
    await expect(
      page.getByRole('switch', { name: 'Notifications', exact: true }),
    ).not.toBeChecked();
    await page.getByRole('tab', { name: 'Details', exact: true }).click();
    await expect(page.getByRole('tabpanel', { name: 'Details', exact: true })).toContainText(
      'Editable source',
    );
    await page.getByRole('button', { name: 'Consumer source', exact: true }).click();
    await expect(
      page.getByRole('button', { name: 'Consumer license', exact: true }),
    ).toHaveAttribute('aria-expanded', 'false');
    for (const [family, title] of [
      ['sheet', 'Consumer edge task'],
      ['drawer', 'Consumer bottom task'],
    ]) {
      const trigger = page.getByRole('button', { name: 'Consumer ' + family, exact: true });
      await trigger.click();
      await expect(page.getByRole('dialog', { name: title, exact: true })).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(trigger).toBeFocused();
    }
    await page.getByRole('button', { name: 'Consumer panel', exact: true }).click();
    await expect(page.getByRole('dialog', { name: 'Consumer floating task' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Consumer panel', exact: true })).toBeFocused();
    await page.getByRole('button', { name: 'Consumer project ID', exact: true }).focus();
    await expect(page.getByRole('tooltip')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('tooltip')).toBeHidden();
    await page.getByRole('button', { name: 'Consumer actions', exact: true }).click();
    await page.getByRole('menuitem', { name: 'Export', exact: true }).press('ArrowRight');
    await expect(page.getByRole('menuitem', { name: 'JSON', exact: true })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('status').first()).toContainText('Consumer JSON selected');
    await expect(page.getByRole('button', { name: 'Consumer actions', exact: true })).toBeFocused();
    await page.getByRole('region', { name: 'Consumer context', exact: true }).focus();
    await page.keyboard.press('Shift+F10');
    await page.getByRole('menuitem', { name: 'Pin project', exact: true }).click();
    await expect(page.getByRole('status').first()).toContainText('Consumer context action');
    await page.getByRole('button', { name: 'Consumer edit dialog', exact: true }).click();
    await expect(page.getByRole('dialog', { name: 'Consumer modal task' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(
      page.getByRole('button', { name: 'Consumer edit dialog', exact: true }),
    ).toBeFocused();
    await page.getByRole('button', { name: 'Consumer confirmation', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Cancel consumer change' })).toBeFocused();
    await page.getByRole('button', { name: 'Cancel consumer change' }).click();
    await expect(page.getByRole('alertdialog')).toHaveCount(0);
    await page.getByRole('button', { name: 'Consumer advanced details', exact: true }).click();
    await expect(page.getByText('Optional details remain mounted while hidden.')).toBeVisible();
    await page.getByRole('button', { name: 'Consumer bold', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Consumer bold', exact: true })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await page
      .getByRole('group', { name: 'Consumer formatting', exact: true })
      .getByRole('button', { name: 'Italic' })
      .click();
    await expect(
      page
        .getByRole('group', { name: 'Consumer formatting', exact: true })
        .getByRole('button', { name: 'Italic' }),
    ).toHaveAttribute('aria-pressed', 'true');
  }
  await page.mouse.move(0, 0);
  await page.evaluate(async () => {
    await Promise.all(
      document
        .getAnimations()
        .filter((a) => a.effect?.getTiming().iterations !== Infinity)
        .map((a) => a.finished.catch(() => {})),
    );
  });
  const light = await page
    .getByRole('button', { name: 'Save project' })
    .evaluate((n) => getComputedStyle(n).backgroundColor);
  expect(light).toBe('rgb(23, 23, 23)');
  await page.getByRole('button', { name: 'Dark theme', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.evaluate(async () => {
    await Promise.all(
      document
        .getAnimations()
        .filter((a) => a.effect?.getTiming().iterations !== Infinity)
        .map((a) => a.finished.catch(() => {})),
    );
  });
  const dark = await page
    .getByRole('button', { name: 'Save project' })
    .evaluate((n) => getComputedStyle(n).backgroundColor);
  expect(dark).toBe('rgb(229, 229, 229)');
  const accessibility = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Menu', exact: true })).toBeFocused();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  expect(overflow).toBe(false);
  expect(errors).toEqual([]);
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(
      () =>
        document.fonts.check('14px \"DM Sans\"') &&
        [...document.fonts].some((f) => f.family.includes('DM Sans') && f.status === 'loaded'),
    ),
  ).toBe(true);
  await page.screenshot({
    path: path.join(root, 'assets/previews/installer-consumer-mobile.png'),
    fullPage: true,
    animations: 'disabled',
  });
  const evidence = {
    consumer,
    ...(fromRegistry ? { registryPackage: installer.name + '@' + installer.version } : { tarball }),
    workspaceImports: false,
    components: Object.keys(
      JSON.parse(fs.readFileSync(path.join(root, 'packages/cli/registry/manifest.json'), 'utf8'))
        .components,
    ).length,
    typecheck: 'passed',
    productionBuild: 'passed',
    sourceInstaller: 'passed',
    themeColors: { light, dark },
    accessibilityViolations: accessibility.violations.length,
    mobileOverflow: overflow,
    pageErrors: errors,
  };
  fs.writeFileSync(
    path.join(
      root,
      fromRegistry ? 'artifacts/installer-registry-smoke.json' : 'artifacts/installer-smoke.json',
    ),
    JSON.stringify(evidence, null, 2),
  );
  console.log(JSON.stringify(evidence, null, 2));
} finally {
  if (browser) await browser.close();
  server.kill('SIGTERM');
}
