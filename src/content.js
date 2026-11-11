// All site copy lives here. Items marked DRAFT are written from the sector list
// you gave me, not from AGSAR's own documents. Check and edit them before launch.

export const company = {
  name: 'AGSAR Electromechanical Engineering LLP',
  short: 'AGSAR',
}

export const nav = [
  { label: 'Sectors', href: '#sectors' },
  { label: 'Grid', href: '#grid' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

// DRAFT copy for each sector. `image` is optional: if the file is missing the
// card falls back to an illustrated gradient, so the site works before images exist.
export const sectors = [
  {
    id: 'solar',
    name: 'Solar',
    tagline: 'From rooftops to utility-scale plants.',
    desc: 'Electrical and mechanical works for solar plants: structure and module erection, DC and AC cabling, inverter and transformer yards, and evacuation to the grid.',
    points: ['Module and structure erection', 'DC / AC cabling and terminations', 'Inverter and transformer yards'],
    accent: '#E5483A',
    image: '/media/sector-solar.jpg',
  },
  {
    id: 'bess',
    name: 'BESS',
    tagline: 'Storage that keeps the grid steady.',
    desc: 'Battery energy storage installations: container placement, power conversion systems, auxiliary power and the electrical interconnection that ties storage into the site.',
    points: ['Battery container installation', 'PCS and transformer interconnection', 'Auxiliary power and controls wiring'],
    accent: '#2F5FC9',
    image: '/media/sector-bess.jpg',
  },
  {
    id: 'wind',
    name: 'Wind Power',
    tagline: 'Turbine to pooling station.',
    desc: 'Electrical infrastructure for wind farms: turbine-side connections, collector cabling, pooling substations and evacuation lines.',
    points: ['Turbine electrical connections', 'Collector network cabling', 'Pooling substation works'],
    accent: '#5B8DEF',
    image: '/media/sector-wind.jpg',
  },
  {
    id: 'ht',
    name: 'HT',
    tagline: 'High-tension distribution, done right.',
    desc: 'High-tension electrical systems: switchgear, transformers, cable laying and jointing, and protection for industrial and renewable sites.',
    points: ['HT switchgear and panels', 'Cable laying, jointing, testing', 'Transformer installation'],
    accent: '#BC372B',
    image: '/media/sector-ht.jpg',
  },
  {
    id: 'eht',
    name: 'EHT',
    tagline: 'Extra-high-tension substations and lines.',
    desc: 'Extra-high-tension infrastructure: substation bays, power transformers, line works and the protection and testing that goes with them.',
    points: ['EHT substation bays', 'Power transformer installation', 'Protection and relay testing'],
    accent: '#2B3F8F',
    image: '/media/sector-eht.jpg',
  },
  {
    id: 'pumps',
    name: 'Pumps & Motors',
    tagline: 'Moving water and machinery reliably.',
    desc: 'Installation, alignment, commissioning and maintenance of pumps and electric motors, including drives, starters and the supporting electrical work.',
    points: ['Pump and motor installation', 'Drives and starters', 'Commissioning and maintenance'],
    accent: '#7FA3E8',
    image: '/media/sector-pumps.jpg',
  },
]

// Indicative voltage classes for the grid graphic. Edit to match what AGSAR actually works on.
export const voltages = [
  { label: '415 V', cls: 'LT', h: 14 },
  { label: '11 kV', cls: 'HT', h: 28 },
  { label: '22 kV', cls: 'HT', h: 40 },
  { label: '33 kV', cls: 'HT', h: 52 },
  { label: '66 kV', cls: 'EHT', h: 64 },
  { label: '110 kV', cls: 'EHT', h: 76 },
  { label: '132 kV', cls: 'EHT', h: 88 },
  { label: '220 kV', cls: 'EHT', h: 100 },
]

export const steps = [
  { title: 'Survey & design', text: 'Site study, load assessment, single-line diagrams and layouts agreed before anything is ordered.' },
  { title: 'Procurement', text: 'Equipment selected and sourced to specification, with delivery tied to site readiness.' },
  { title: 'Installation', text: 'Electrical and mechanical erection, cabling and terminations, coordinated with civil works.' },
  { title: 'Testing & commissioning', text: 'Insulation, protection and functional tests, then energisation and handover.' },
  { title: 'Operation support', text: 'Preventive maintenance, spares and breakdown response after the plant is live.' },
]

export const pillars = [
  { title: 'Electrical and mechanical, one team', text: 'Fewer hand-offs between trades means fewer gaps on site.' },
  { title: 'Built for the grid', text: 'From 415 V panels to EHT bays, work is planned around how power actually flows.' },
  { title: 'Executed on site', text: 'Plans, permits and safety are settled before crews mobilise.' },
]

// PLACEHOLDERS: replace with AGSAR's real details.
export const contact = {
  email: 'info@your-domain.com',
  phone: '+91 00000 00000',
  address: 'Add registered office address here',
}
