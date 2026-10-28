export type Order = {
  id: string;
  customer: string;
  email: string;
  initials: string;
  plan: 'Scale' | 'Growth' | 'Starter';
  status: 'Paid' | 'Pending' | 'Refunded';
  amount: number;
  date: string;
};
const customers = [
  ['Alex Morgan', 'alex@northstar.example', 'AM'],
  ['Lina Chen', 'lina@forma.example', 'LC'],
  ['Sam Rivera', 'sam@meridian.example', 'SR'],
  ['Jordan Lee', 'jordan@atlas.example', 'JL'],
  ['Maya Patel', 'maya@relay.example', 'MP'],
  ['Noah Wilson', 'noah@acme.example', 'NW'],
  ['Emilia Rossi', 'emilia@field.example', 'ER'],
  ['Oliver Park', 'oliver@orbit.example', 'OP'],
  ['Sofia Davis', 'sofia@studio.example', 'SD'],
  ['Ethan Brooks', 'ethan@linear.example', 'EB'],
  ['Isla Kim', 'isla@mono.example', 'IK'],
  ['Leo Martin', 'leo@craft.example', 'LM'],
  ['Amara Singh', 'amara@shift.example', 'AS'],
  ['Theo Wright', 'theo@arc.example', 'TW'],
  ['Nora Adams', 'nora@open.example', 'NA'],
  ['Felix Stone', 'felix@signal.example', 'FS'],
  ['Clara Ito', 'clara@frame.example', 'CI'],
  ['Owen Hall', 'owen@grid.example', 'OH'],
];
export const orders: Order[] = customers.map(([customer, email, initials], i) => ({
  id: `AF-${1048 - i}`,
  customer,
  email,
  initials,
  plan: (['Scale', 'Growth', 'Starter'] as const)[i % 3],
  status: i % 7 === 2 ? 'Pending' : i % 8 === 5 ? 'Refunded' : 'Paid',
  amount: [249, 129, 49][i % 3],
  date: `2026-10-${String(14 - (i % 14)).padStart(2, '0')}`,
}));
