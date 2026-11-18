/**
 * Practice areas: used by the "What we do" slider, the What we do page
 * and each practice area's own page (/what-we-do/:slug).
 *
 * To use a photograph on a card, drop it in src/assets and add:
 *   import land from '../assets/land.jpg'   ...   image: land
 * Cards without an image get the brand gradient (from -> to).
 *
 * The detail copy is general information about each service. Please have
 * the chambers review it before launch.
 */
export const practiceAreas = [
  {
    slug: 'land-property',
    title: 'Land & Property Law',
    desc: 'Title investigation and perfection, conveyancing, land disputes, tenancy and recovery of premises.',
    from: '#2b1a14',
    to: '#74402f',
    lead: 'Land is often the most valuable thing a family or business owns. We make sure what you buy, sell, lease or inherit is protected properly, from the first search to the final registered title.',
    overview: [
      'Property transactions in Nigeria carry real risk: competing claims from family land owners, documents that were never registered, government acquisition, and boundaries that do not match the survey. Most of these problems can be found and avoided before money changes hands.',
      'We investigate title at the Lands Registry and other relevant offices, prepare and review transaction documents, and guide you through perfection of title, including the Governor’s consent required under the Land Use Act. Where a dispute has already arisen, we represent you in negotiation, in court and in recovery of possession.',
    ],
    services: [
      'Search and investigation of title before purchase',
      'Deeds of assignment, contracts of sale and powers of attorney',
      'Perfection of title, Governor’s consent and Certificate of Occupancy applications',
      'Leases and tenancy agreements for residential and commercial property',
      'Recovery of premises and landlord–tenant disputes',
      'Land disputes, trespass and declaration of title actions',
    ],
    approach: [
      { title: 'Review', text: 'We look at every document you have and tell you plainly what it does and does not prove.' },
      { title: 'Investigate', text: 'We carry out searches and confirm the true owner, the survey and any encumbrances.' },
      { title: 'Document', text: 'We prepare or vet the agreements so your interest is properly recorded.' },
      { title: 'Perfect & protect', text: 'We see the title through registration and step in quickly if a dispute arises.' },
    ],
    bring: [
      'Any documents you hold: receipts, purchase agreement, survey plan or C of O',
      'The address or description of the property',
      'Names of the seller, landlord or other parties involved',
      'Your means of identification',
    ],
    faqs: [
      {
        q: 'Why should I do a search before buying land?',
        a: 'A search confirms who really owns the land, whether it is free of government acquisition and whether anyone else has a registered interest. It is the single most effective way to avoid losing money on a property.',
      },
      {
        q: 'What is Governor’s consent and do I need it?',
        a: 'Under the Land Use Act, a transfer of an interest in land is not valid without the consent of the State Governor. Obtaining it is part of perfecting your title, and we handle the application for you.',
      },
      {
        q: 'My tenant has stopped paying rent. What can I do?',
        a: 'The correct statutory notices must be served before a landlord can recover possession. Getting this step wrong can delay the whole process, so speak with us before taking any action yourself.',
      },
    ],
  },
  {
    slug: 'litigation',
    title: 'Litigation & Dispute Resolution',
    desc: 'Representation before the courts and tribunals, with arbitration and mediation where they serve you better.',
    from: '#131d2b',
    to: '#33465e',
    lead: 'When a dispute cannot be avoided, you need representation that is prepared, persistent and honest about your prospects. We act for individuals, families and businesses at every level of court.',
    overview: [
      'Not every dispute belongs in court. Before we file anything, we assess the strength of your case, the likely cost and the time involved, and whether negotiation, mediation or arbitration could resolve the matter faster and on better terms.',
      'Where litigation is the right path, we prepare thoroughly, keep you informed at every stage and present your case firmly before the High Court, Magistrate Courts, Customary Courts and appellate courts.',
    ],
    services: [
      'Civil claims, debt recovery and breach of contract',
      'Pre-action letters and demand notices',
      'Negotiated settlements and mediation',
      'Arbitration and other alternative dispute resolution',
      'Enforcement of judgments',
      'Appeals',
    ],
    approach: [
      { title: 'Assess', text: 'We review the facts and documents and give you a clear view of your options.' },
      { title: 'Resolve early', text: 'Where possible we try to settle by letter, negotiation or mediation.' },
      { title: 'Litigate', text: 'If needed, we file and prosecute or defend the case with careful preparation.' },
      { title: 'Enforce', text: 'A judgment only matters if it is obeyed, so we follow through to enforcement.' },
    ],
    bring: [
      'Any letters, agreements, receipts or messages relating to the dispute',
      'Court papers you have received, if any',
      'A short timeline of what happened, in your own words',
      'Names and contact details of the other parties',
    ],
    faqs: [
      {
        q: 'How long will my case take?',
        a: 'It depends on the court, the complexity of the matter and how the other side responds. We give you a realistic estimate at the start and update you as the case progresses.',
      },
      {
        q: 'Can we settle without going to court?',
        a: 'Often, yes. Many disputes are resolved by a well-prepared demand letter or by negotiation or mediation. We always consider these options first.',
      },
      {
        q: 'I have been served with court papers. What should I do?',
        a: 'Do not ignore them. Court processes have strict time limits for a response. Contact us as soon as possible so we can protect your position.',
      },
    ],
  },
  {
    slug: 'family',
    title: 'Family & Matrimonial Causes',
    desc: 'Divorce, custody, maintenance and settlements, handled with discretion and care.',
    from: '#33201f',
    to: '#8b4a3a',
    lead: 'Family matters are personal and often painful. We give calm, confidential advice and work towards outcomes that protect you and, above all, your children.',
    overview: [
      'Whether you are considering a divorce, facing a custody disagreement or need maintenance for yourself or your children, the decisions you make now can shape your family’s future for years. You deserve clear advice delivered with sensitivity.',
      'We advise on dissolution of statutory marriages under the Matrimonial Causes Act, judicial separation, custody and access, maintenance and the settlement of property. Wherever it is in the family’s interest, we encourage amicable agreement before contested proceedings.',
    ],
    services: [
      'Dissolution of marriage and judicial separation',
      'Custody, access and welfare of children',
      'Maintenance for spouses and children',
      'Settlement of matrimonial property',
      'Pre-nuptial and separation agreements',
      'Customary marriage and its dissolution',
    ],
    approach: [
      { title: 'Listen', text: 'We take time to understand your situation and what matters most to you.' },
      { title: 'Advise', text: 'We explain your rights, the options available and the likely outcomes.' },
      { title: 'Negotiate', text: 'Where possible, we work towards an agreement that avoids a long court fight.' },
      { title: 'Represent', text: 'If proceedings are necessary, we represent you firmly and with discretion.' },
    ],
    bring: [
      'Your marriage certificate, or details of a customary marriage',
      'Birth certificates of any children',
      'Information about income, property and joint assets',
      'Any letters or court papers already exchanged',
    ],
    faqs: [
      {
        q: 'Is our consultation confidential?',
        a: 'Yes. Everything you tell us is protected by legal professional privilege and our duty of confidentiality.',
      },
      {
        q: 'How is custody of children decided?',
        a: 'The court’s guiding principle is the welfare and best interests of the child. We help you present the arrangements that genuinely serve your children.',
      },
      {
        q: 'Do we have to go to court to divorce?',
        a: 'A statutory marriage can only be dissolved by a court order, but many of the issues around it, such as custody, maintenance and property, can be agreed between the parties first.',
      },
    ],
  },
  {
    slug: 'probate',
    title: 'Probate & Estate Administration',
    desc: 'Wills, letters of administration, probate and the fair distribution of estates.',
    from: '#1b2420',
    to: '#46584e',
    lead: 'Planning ahead spares your loved ones uncertainty and conflict. And when someone has passed, we help the family settle the estate properly and fairly.',
    overview: [
      'A properly drafted and executed will is the clearest way to make sure your property goes to the people you choose. Without one, the estate is shared according to law and custom, which can lead to delay and family disputes.',
      'We prepare wills, advise on estate planning and act for executors and families in obtaining probate or letters of administration from the Probate Registry. We then help gather the assets, settle debts and distribute the estate in line with the will or the law.',
    ],
    services: [
      'Drafting and safe custody of wills and codicils',
      'Estate planning for individuals and families',
      'Applications for probate',
      'Letters of administration where there is no will',
      'Administration and distribution of estates',
      'Resolving disputes between beneficiaries',
    ],
    approach: [
      { title: 'Understand', text: 'We learn about your family, your property and your wishes.' },
      { title: 'Draft', text: 'We prepare clear documents that reflect your intentions and meet legal requirements.' },
      { title: 'Apply', text: 'For an estate, we prepare and file the application for the grant.' },
      { title: 'Distribute', text: 'We help executors and administrators settle and share the estate correctly.' },
    ],
    bring: [
      'A list of your properties, accounts and other assets',
      'Details of the people you wish to benefit',
      'For an estate: the death certificate and any existing will',
      'Identification of the executors or family representatives',
    ],
    faqs: [
      {
        q: 'What happens if someone dies without a will?',
        a: 'The family must apply for letters of administration, and the estate is distributed according to the applicable law and customs. A will avoids much of this uncertainty.',
      },
      {
        q: 'Can I change my will later?',
        a: 'Yes. You can update your will with a codicil or make a new will at any time, as long as you have the capacity to do so.',
      },
      {
        q: 'How long does it take to obtain probate?',
        a: 'Timelines vary with the size of the estate and the Probate Registry. We prepare the application fully at the start to avoid avoidable delays.',
      },
    ],
  },
  {
    slug: 'corporate',
    title: 'Corporate & Commercial Law',
    desc: 'Company incorporation, contracts, business advisory and regulatory compliance.',
    from: '#18202c',
    to: '#3c4f6b',
    lead: 'From registering a new business to closing a major contract, we give practical legal support that lets you focus on running and growing your company.',
    overview: [
      'Sound legal foundations save businesses money. A well-structured company, clear agreements between founders and carefully drafted contracts prevent many of the disputes that stall growth.',
      'We register businesses and companies with the Corporate Affairs Commission under the Companies and Allied Matters Act, keep them compliant with annual filings, and draft and review the contracts businesses rely on every day.',
    ],
    services: [
      'Registration of business names, companies and incorporated trustees',
      'Shareholders’ and partnership agreements',
      'Drafting and review of commercial contracts',
      'Annual returns and corporate compliance',
      'Business advisory and regulatory guidance',
      'Commercial dispute resolution',
    ],
    approach: [
      { title: 'Understand the business', text: 'We learn how your business works and where its risks lie.' },
      { title: 'Structure', text: 'We advise on the right vehicle and set it up correctly.' },
      { title: 'Document', text: 'We draft clear, enforceable agreements for your key relationships.' },
      { title: 'Stay compliant', text: 'We keep filings and obligations up to date so there are no surprises.' },
    ],
    bring: [
      'Proposed business names and a description of the business',
      'Details of directors, shareholders or partners',
      'Any contracts or documents you want reviewed',
      'Existing CAC documents, if already registered',
    ],
    faqs: [
      {
        q: 'Should I register a business name or a limited company?',
        a: 'It depends on your plans, liability exposure and how you intend to raise money. We explain the differences and recommend what fits your business.',
      },
      {
        q: 'What are annual returns?',
        a: 'Registered companies must file annual returns with the Corporate Affairs Commission. Missing them attracts penalties, and we can manage the filings for you.',
      },
      {
        q: 'Can you review a contract before I sign it?',
        a: 'Yes. A review before signing is one of the most cost-effective legal steps a business can take.',
      },
    ],
  },
  {
    slug: 'criminal',
    title: 'Criminal Law & Defence',
    desc: 'Representation at every stage, from police custody and bail to trial and appeal.',
    from: '#1d1614',
    to: '#5a3a33',
    lead: 'If you or a family member is arrested, investigated or charged, early legal advice matters. We protect your rights from the first moment and at every stage after.',
    overview: [
      'The hours after an arrest are often the most important in a criminal matter. You have the right to remain silent and the right to a lawyer of your choice, and any statement you make can be used later.',
      'We attend at police stations, apply for bail, and defend clients before the Magistrate and High Courts, with guidance on the Administration of Criminal Justice Law. We also advise victims and complainants on how to pursue their complaint properly.',
    ],
    services: [
      'Attendance at police stations and during investigations',
      'Bail applications',
      'Defence at trial before the Magistrate and High Courts',
      'Enforcement of fundamental human rights',
      'Advice to complainants and victims',
      'Criminal appeals',
    ],
    approach: [
      { title: 'Respond quickly', text: 'We act at once to protect your rights during arrest and questioning.' },
      { title: 'Secure liberty', text: 'We pursue bail at the earliest opportunity.' },
      { title: 'Prepare the defence', text: 'We test the evidence and build your defence carefully.' },
      { title: 'Defend & appeal', text: 'We represent you at trial and on appeal where necessary.' },
    ],
    bring: [
      'Any charge sheet, invitation letter or court summons',
      'The police station or agency involved',
      'Names of witnesses and any relevant documents or messages',
      'Identification for the person concerned',
    ],
    faqs: [
      {
        q: 'Should I make a statement to the police without a lawyer?',
        a: 'You are entitled to have a lawyer of your choice present. It is usually best to take legal advice before making a statement.',
      },
      {
        q: 'Is bail free?',
        a: 'Bail itself is free in law. Conditions such as sureties may be attached, and we help you meet them and challenge unreasonable conditions.',
      },
      {
        q: 'Someone I know has been detained. What should I do?',
        a: 'Call us as soon as possible with the person’s name and where they are being held. We can attend and take steps to secure their release.',
      },
    ],
  },
  {
    slug: 'notary',
    title: 'Notary Public Services',
    desc: 'Authentication, attestation and certification of documents for use at home and abroad.',
    from: '#2a2216',
    to: '#7d6230',
    lead: 'As Notaries Public of Nigeria, we authenticate and certify documents so they are accepted by banks, embassies, schools and authorities at home and abroad.',
    overview: [
      'Documents used outside Nigeria, and some used within it, often need to be notarised before they are accepted. A notary confirms the identity of the person signing, witnesses the signature and certifies copies as true.',
      'We notarise documents for travel, study, business and property, and we can advise on any further legalisation steps, such as authentication by the Ministry of Foreign Affairs or the relevant embassy, that the receiving authority may require.',
    ],
    services: [
      'Notarisation of signatures and declarations',
      'Certified true copies of documents',
      'Powers of attorney for use abroad',
      'Documents for visa, study and immigration applications',
      'Authentication of company and commercial documents',
      'Guidance on further legalisation requirements',
    ],
    approach: [
      { title: 'Check', text: 'We confirm what the receiving authority requires before anything is signed.' },
      { title: 'Verify', text: 'We verify the identity of the signatory and review the document.' },
      { title: 'Notarise', text: 'We witness the signing and apply our notarial certificate and seal.' },
      { title: 'Advise next steps', text: 'We explain any further legalisation the document may need.' },
    ],
    bring: [
      'The original document, unsigned if it is to be signed before us',
      'A valid means of identification, such as an international passport',
      'Any instructions from the embassy, bank or school receiving it',
      'Copies of documents to be certified, with the originals',
    ],
    faqs: [
      {
        q: 'Should I sign the document before I come?',
        a: 'No. Where a signature is to be notarised, it must be signed in the notary’s presence. Bring the document unsigned.',
      },
      {
        q: 'Is notarisation the same as legalisation?',
        a: 'No. Notarisation is done by us. Some countries also require the document to be legalised by the Ministry of Foreign Affairs or an embassy afterwards. We will tell you if this applies.',
      },
      {
        q: 'How long does notarisation take?',
        a: 'Most straightforward notarisations can be completed at a single appointment, once we have the original document and your identification.',
      },
    ],
  },
  {
    slug: 'employment',
    title: 'Employment & Labour Law',
    desc: 'Contracts, disputes, wrongful dismissal and workplace compliance for employers and employees.',
    from: '#1a2128',
    to: '#4a5b6b',
    lead: 'Clear terms and fair processes protect both employers and employees. We advise on the employment relationship from the offer letter to its end.',
    overview: [
      'Many workplace disputes start with an unclear contract or a dismissal that did not follow the right procedure. Getting the documents and processes right at the beginning prevents costly claims later.',
      'We draft employment contracts and staff handbooks, advise on discipline, redundancy and termination, and represent employers and employees in disputes, including before the National Industrial Court.',
    ],
    services: [
      'Employment contracts, offer letters and staff handbooks',
      'Disciplinary procedures and terminations',
      'Wrongful dismissal and unpaid entitlements claims',
      'Redundancy and restructuring advice',
      'Workplace policies and statutory compliance',
      'Representation before the National Industrial Court',
    ],
    approach: [
      { title: 'Review', text: 'We look at the contract, policies and what has happened so far.' },
      { title: 'Advise', text: 'We explain your rights and obligations and the risks of each option.' },
      { title: 'Resolve', text: 'We aim for a fair settlement wherever one is possible.' },
      { title: 'Represent', text: 'If needed, we take or defend the claim before the National Industrial Court.' },
    ],
    bring: [
      'Your employment contract or offer letter',
      'Any queries, warnings or termination letters',
      'Payslips and records of entitlements',
      'Relevant workplace policies or handbooks',
    ],
    faqs: [
      {
        q: 'Can my employer dismiss me without a reason?',
        a: 'It depends on your contract and the circumstances. Even where termination is allowed, the correct procedure and notice must usually be followed. We can review your position.',
      },
      {
        q: 'Do I need written employment contracts?',
        a: 'Yes. Written terms protect both sides and are required for most employees. We draft contracts suited to your business.',
      },
      {
        q: 'Which court handles employment disputes?',
        a: 'Employment and labour disputes are generally heard by the National Industrial Court of Nigeria.',
      },
    ],
  },
    {
    slug: 'customary-law',
    title: 'Community & Customary Law Practice',
    desc: 'Family and community land, chieftaincy, customary inheritance and disputes before customary courts.',
    from: '#2a1d12',
    to: '#6b4a2b',
    lead: 'Many of the matters closest to families and communities are governed by custom as much as by statute. We understand both, and we help you resolve them with respect for tradition and the law.',
    overview: [
      'Customary law shapes how family land is held and shared, how inheritance passes, how chieftaincy titles are succeeded to and how many communities settle disputes. In Benin and across Edo State, these customs carry real legal weight and are recognised by the courts.',
      'We advise families, communities and traditional institutions, and represent clients before Customary Courts, the High Court and appellate courts. Wherever it serves the family or community, we support settlement through family meetings, elders and traditional councils before litigation.',
    ],
    services: [
      'Family land and communal land disputes',
      'Customary inheritance and sharing of family property',
      'Chieftaincy and traditional title disputes',
      'Customary marriage, its dissolution and related claims',
      'Representation before Customary Courts and on appeal',
      'Drafting family and community agreements and resolutions',
    ],
    approach: [
      { title: 'Understand the custom', text: 'We establish the custom that applies and how it has been followed in your family or community.' },
      { title: 'Gather the history', text: 'We collect the family history, documents and witnesses that support your position.' },
      { title: 'Seek settlement', text: 'Where possible, we work through family meetings, elders or traditional councils.' },
      { title: 'Litigate if needed', text: 'If a settlement is not possible, we represent you in court.' },
    ],
    bring: [
      'Any family or community documents, letters or resolutions',
      'A family tree or the names of the key family members',
      'Details of the land, title or property in question',
      'Any court papers already served',
    ],
    faqs: [
      {
        q: 'Do courts recognise customary law?',
        a: 'Yes. Customary law is part of Nigerian law. Courts apply it where it is proved and is not contrary to natural justice, equity and good conscience or any written law.',
      },
      {
        q: 'Can a family dispute be settled without going to court?',
        a: 'Often it can. Family meetings, elders and traditional councils resolve many disputes, and we can help prepare for these and record any settlement properly.',
      },
      {
        q: 'Which court handles customary law matters?',
        a: 'Many begin at the Customary Court, but some, such as land disputes of a certain value or nature, are heard by the High Court. We advise on the right forum for your matter.',
      },
    ],
  },
  {
    slug: 'election-matters',
    title: 'Electoral & Election Matters',
    desc: 'Pre-election and post-election matters, from party primaries and nominations to election petitions and appeals.',
    from: '#14212a',
    to: '#2f5566',
    lead: 'Election cases move fast and the time limits are strict. We advise candidates, political parties and stakeholders before, during and after elections, and act quickly when it matters most.',
    overview: [
      'Electoral disputes are governed by the Constitution, the Electoral Act and the rules of the courts and tribunals. The timelines are fixed and cannot be extended: a pre-election suit must be filed within 14 days of the act complained of, and an election petition within 21 days after the declaration of results.',
      'We handle pre-election matters such as party primaries, nominations, substitutions and disqualification, and post-election petitions challenging or defending a return before election tribunals and on appeal. We also advise on compliance with electoral law throughout the process.',
    ],
    services: [
      'Pre-election suits on party primaries, nominations and substitution',
      'Disqualification and eligibility challenges',
      'Election petitions before election tribunals',
      'Defending a declared winner’s return',
      'Election appeals',
      'Advice on electoral law compliance for candidates and parties',
    ],
    approach: [
      { title: 'Act immediately', text: 'We check the deadlines first, because in election matters a late filing ends the case.' },
      { title: 'Gather evidence', text: 'We collect the documents, results and witness accounts that the case will rest on.' },
      { title: 'File & prosecute', text: 'We prepare and file promptly and see the matter through the tribunal or court.' },
      { title: 'Appeal', text: 'If needed, we take or defend the appeal within the strict time allowed.' },
    ],
    bring: [
      'Party guidelines, primary results and nomination documents',
      'Results sheets, certified true copies and other election materials',
      'The dates of the events or declaration you wish to challenge',
      'Names and contacts of agents and witnesses',
    ],
    faqs: [
      {
        q: 'How long do I have to file a pre-election matter?',
        a: 'Under the Constitution, a pre-election suit must be filed within 14 days of the event, decision or action complained of. Speak with us immediately.',
      },
      {
        q: 'How long do I have to file an election petition?',
        a: 'An election petition must be filed within 21 days after the date the result is declared. The tribunal then has 180 days to give judgment.',
      },
      {
        q: 'Do you act for both petitioners and respondents?',
        a: 'Yes. We act for candidates and parties challenging a result and for those defending a declared return.',
      },
    ],
  },
]

export const getPracticeArea = (slug) => practiceAreas.find((p) => p.slug === slug)
