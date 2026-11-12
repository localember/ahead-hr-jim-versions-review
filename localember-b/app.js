/* Preview only. This file never sends a request. */
(function () {
  "use strict";

  window.fetch = function () {
    return Promise.reject(new Error("Preview does not send."));
  };
  if (window.XMLHttpRequest) {
    XMLHttpRequest.prototype.open = function () {};
    XMLHttpRequest.prototype.send = function () {};
  }

  var DISCLAIMER = "This guide gives general information to help you weigh your options. It isn't legal, tax or insurance advice. Rules vary by state and by company size, so confirm details with AHEAD or another qualified professional before you act.";
  var SCHEDULER = "https://www.hrstaff.net/scheduler-demo/";
  var PHONE = "920-593-1208";
  var EMAIL = "support@hrstaff.net";

  var GROUPS = [
    "People & performance",
    "Benefits & payroll",
    "Compliance & government",
    "Safety"
  ];

  var STATES = ["Wisconsin","Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wyoming"];

  var ROLES = ["Owner / operator", "HR or office manager", "Supervisor / manager", "Other"];
  var SIZES = ["1 – 10 employees", "11 – 20 employees", "21 – 50 employees", "51 – 100 employees", "101+ employees"];
  var URGENCY = ["Urgent: this week", "Within 30 days", "Planning ahead"];

  function opt(title, body, steps, who, timeline, cost, recommended) {
    return { title: title, body: body, steps: steps, who: who || "", timeline: timeline || "", cost: cost || "", recommended: !!recommended };
  }

  var ISSUES = [
    {
      id: "complaint",
      group: "People & performance",
      title: "An employee filed a complaint",
      blurb: "Harassment, discrimination, a manager conflict or a policy concern raised internally.",
      lawsuit: true,
      seriousQ: "how far has the complaint gone?",
      serious: [
        ["Just raised internally", "Someone told a manager, and nothing is written down yet."],
        ["A written complaint", "There is a written report, and people are waiting on a response."],
        ["An outside charge or letter", "An agency or an attorney has already been in touch."]
      ],
      first: "Write down what was reported, who heard it, and the date. Keep the notes factual.",
      urgent: "Speak with the people involved separately, and do not let the report sit while you decide what to do.",
      options: [
        opt("Look into it yourself", "A private, even-handed look at what was reported.", ["Talk with each person separately.", "Write down what you heard.", "Tell them what will happen next."], "You and your managers", "This week", "Your time", false),
        opt("AHEAD guides the review", "AHEAD helps you take the report, keep the notes consistent, and coach the manager on the conversations.", ["AHEAD reviews what was reported.", "AHEAD outlines the conversations and the notes to keep.", "AHEAD helps you close the loop with the people involved."], "AHEAD HR advisor", "1–2 weeks", "Quoted by AHEAD", true),
        opt("Outside investigator", "An independent person interviews the people involved and writes up what they found.", ["Choose an investigator with workplace experience.", "Give them the notes you already have.", "Review their write-up before you decide next steps."], "Outside investigator", "2–4 weeks", "Medium", false)
      ]
    },
    {
      id: "problem",
      group: "People & performance",
      title: "A problem employee",
      blurb: "Attitude, attendance, insubordination or behavior that's hurting the team.",
      lawsuit: true,
      seriousQ: "how serious has it gotten?",
      serious: [
        ["Early warning signs", "Some friction but nothing documented yet."],
        ["Repeated, documented issues", "Warnings have been given and the behavior continues."],
        ["Serious misconduct", "Threats, theft, violence or a major policy violation."]
      ],
      first: "Write down specific incidents with dates. Then have a direct, private conversation about expectations.",
      urgent: "If there's a safety threat, remove the person from the workplace now with paid administrative leave, then call AHEAD.",
      options: [
        opt("Coach and document it yourself", "A clear conversation that names the behavior and what has to change.", ["Use specific examples, not labels.", "Put expectations in writing.", "Check in every week for a month."], "You and your managers", "30 days", "Your time", false),
        opt("AHEAD manages the discipline process", "AHEAD drafts the warnings, coaches your manager and keeps the paper trail consistent and defensible.", ["AHEAD reviews the file and how others were treated.", "AHEAD drafts written warnings or a final notice.", "AHEAD guides a separation if it comes to that."], "AHEAD HR advisor", "1–4 weeks", "Quoted by AHEAD", true),
        opt("Behavior or conflict coach", "An outside coach works directly with the employee or the manager on behavior.", ["Choose a coach with workplace experience.", "Set goals and a time frame.", "Review progress together."], "Workplace coach", "30–90 days", "Medium", false)
      ]
    },
    {
      id: "performance",
      group: "People & performance",
      title: "Poor-performing employee",
      blurb: "Missed goals, low-quality work or a skills gap you can't ignore anymore.",
      lawsuit: true,
      seriousQ: "how far has the performance problem gone?",
      serious: [
        ["Early misses", "A few missed goals, and nothing is written down yet."],
        ["A pattern, already discussed", "You have talked about it, and the work has not improved."],
        ["The role is not getting done", "The gap is affecting the team or the work you owe customers."]
      ],
      first: "Write down the specific results that are missing, with dates, and compare them to what the job requires.",
      urgent: "If the person is still in a new-hire period, check that date before the window closes.",
      options: [
        opt("Coach it yourself", "A clear plan for what good work looks like.", ["Name the results, not the personality.", "Agree on what will change and by when.", "Meet weekly for a month."], "You and your managers", "30 days", "Your time", false),
        opt("AHEAD builds the performance plan", "AHEAD drafts the plan, coaches the manager, and keeps the notes consistent.", ["AHEAD reviews the job and the recent work.", "AHEAD drafts a written plan with check-in dates.", "AHEAD helps you decide the next step if the work does not change."], "AHEAD HR advisor", "30–60 days", "Quoted by AHEAD", true),
        opt("Training or a role change", "Extra training, a closer coach, or a different seat if the skills do not fit.", ["Name the skill that is missing.", "Set a short training window.", "Review whether the role still fits."], "You and a trainer", "30–90 days", "Your time", false)
      ]
    },
    {
      id: "turnover",
      group: "People & performance",
      title: "Turnover is too high",
      blurb: "People keep leaving, and it's costing you time, money and morale.",
      lawsuit: true,
      seriousQ: "what does the turnover look like?",
      serious: [
        ["A few people left", "One or two departures, and you are not sure why."],
        ["A steady pattern", "People keep leaving the same roles or the same team."],
        ["Key people are leaving", "Supervisors or hard-to-replace staff are walking out."]
      ],
      first: "List who left recently, their role, and the reason they gave.",
      urgent: "If someone just resigned, hold a short exit conversation before they are gone.",
      options: [
        opt("Ask and track it yourself", "Stay conversations and a simple count of who leaves.", ["Ask current staff what would make them stay.", "Hold an exit conversation with each person who leaves.", "Look for the same reason showing up twice."], "You and your managers", "30 days", "Your time", false),
        opt("AHEAD reviews why people leave", "AHEAD looks at the pattern, the pay and schedule practices, and the manager conversations.", ["AHEAD reviews who left and why.", "AHEAD suggests the two or three changes to make first.", "AHEAD coaches managers on stay conversations."], "AHEAD HR advisor", "2–4 weeks", "Quoted by AHEAD", true),
        opt("Stay-interview help", "An outside person talks with your team so people can speak more freely.", ["Pick a small group to start with.", "Have the conversations.", "Share what you will change."], "Outside interviewer", "2–4 weeks", "Medium", false)
      ]
    },
    {
      id: "hiring",
      group: "People & performance",
      title: "Can't find employees",
      blurb: "Open roles sit unfilled, or the applicants you get aren't qualified.",
      lawsuit: false,
      seriousQ: "how stuck is hiring?",
      serious: [
        ["A role has been open a while", "Applicants are slow, but a few are close."],
        ["The applicants are not qualified", "People apply, and almost none can do the work."],
        ["You cannot staff the work", "Open roles are affecting production, service, or hours."]
      ],
      first: "Write down the must-have skills for the open role, separate from the nice-to-haves.",
      urgent: "If a shift is uncovered this week, decide who covers it before you redesign hiring.",
      options: [
        opt("Refresh the posting yourself", "A clearer ad and a faster reply to applicants.", ["Rewrite the posting in plain words.", "Reply to new applicants within two days.", "Drop requirements the job does not actually need."], "You", "1–2 weeks", "Your time", false),
        opt("AHEAD helps you hire", "AHEAD tightens the posting, the screening questions, and the way managers interview.", ["AHEAD reviews the role and the current posting.", "AHEAD drafts screening questions.", "AHEAD coaches the interview so each candidate is asked the same things."], "AHEAD HR advisor", "1–3 weeks", "Quoted by AHEAD", true),
        opt("A recruiting partner", "An outside recruiter searches for people you are not reaching.", ["Agree on the must-have skills.", "Set a time frame and a check-in.", "You still make the hiring decision."], "Recruiter", "Varies", "Medium", false)
      ]
    },
    {
      id: "morale",
      group: "People & performance",
      title: "Low morale or engagement",
      blurb: "Complaints, gossip, quiet quitting or a general drop in energy.",
      lawsuit: true,
      seriousQ: "how does the morale problem show up?",
      serious: [
        ["Quiet complaints", "Grumbling and less energy, with nothing written down."],
        ["It is affecting the work", "Gossip, missed handoffs, or people doing the minimum."],
        ["People are checked out", "Key staff have stopped speaking up, or several want to leave."]
      ],
      first: "Ask two or three trusted people what changed, and write down the themes, not the names.",
      urgent: "If a blow-up just happened, talk with the people involved this week.",
      options: [
        opt("Listen and reset it yourself", "Short conversations and one visible change.", ["Ask what is getting in the way.", "Pick one thing you will change.", "Tell the team what you decided."], "You and your managers", "2–4 weeks", "Your time", false),
        opt("AHEAD coaches the reset", "AHEAD helps you sort the themes and coach the manager on what to say.", ["AHEAD reviews what you are hearing.", "AHEAD drafts a simple set of team conversations.", "AHEAD helps you pick the first change to make."], "AHEAD HR advisor", "2–4 weeks", "Quoted by AHEAD", true),
        opt("Team workshop", "A facilitated meeting so the group can name what is stuck.", ["Choose a facilitator.", "Keep the session about the work, not about blaming a person.", "Leave with two commitments."], "Facilitator", "1–2 weeks", "Medium", false)
      ]
    },
    {
      id: "tracking",
      group: "People & performance",
      title: "Manual tracking is overwhelming",
      blurb: "PTO, unpaid time off, hours, schedules, handwritten time-off requests and garnishments by hand or on spreadsheets.",
      lawsuit: false,
      seriousQ: "how heavy is the tracking?",
      serious: [
        ["A few things are still on paper", "PTO or hours live on a spreadsheet, and it mostly works."],
        ["It is eating the week", "You are chasing punches, time-off requests, or garnishments by hand."],
        ["Mistakes are reaching people", "Wrong hours, missed time off, or a garnishment that was not taken."]
      ],
      first: "List every tracker you keep by hand, and who has to update it.",
      urgent: "If a garnishment or a final paycheck depends on a handwritten sheet, check that one before the next payroll.",
      options: [
        opt("Clean up the spreadsheet", "One owner, one sheet, and a weekly check.", ["Name one person who owns each tracker.", "Drop the duplicate sheets.", "Review it the day before payroll."], "You and your office", "2 weeks", "Your time", false),
        opt("AHEAD sets up a simpler process", "AHEAD maps what you track and lines it up with time and payroll so less of it is retyped.", ["AHEAD reviews the sheets and the handoffs.", "AHEAD recommends what should move into a system.", "AHEAD helps you set the weekly routine."], "AHEAD HR advisor", "2–4 weeks", "Quoted by AHEAD", true),
        opt("Time and attendance system", "A system that collects hours and time off so payroll is not rebuilt by hand.", ["List what the system must do.", "Pilot it with one team.", "Retire the old sheet only after the pilot matches."], "You and a software partner", "30–60 days", "Quoted with the tool", false)
      ]
    },
    {
      id: "termination",
      group: "People & performance",
      title: "Planning a termination or layoff",
      blurb: "You need to let one person go, or reduce staff, without creating risk.",
      lawsuit: true,
      seriousQ: "what kind of separation is it?",
      serious: [
        ["One employee, for cause", "Performance or conduct, with documentation."],
        ["A few positions eliminated", "A business-driven reduction of a small number of roles."],
        ["A larger layoff", "Many employees, possibly at one site."]
      ],
      first: "Review the file to make sure the reason is documented and consistent with past decisions.",
      urgent: "Check your state's final-paycheck deadline. In some states it's due on the last day of work.",
      options: [
        opt("Use a termination checklist", "A respectful exit meeting with the paperwork ready.", ["Prepare final pay and benefit notices.", "Have a witness in the meeting.", "Collect company property and shut off access."], "", "", "", false),
        opt("AHEAD plans and manages the separation", "AHEAD reviews the risk, prepares the paperwork and severance terms, and helps you run the meeting.", ["AHEAD reviews the file and the reason.", "AHEAD prepares final pay, COBRA and"], "", "", "", true),
        opt("Outplacement services", "Career help for departing employees, which softens the exit and lowers the chance of disputes.", ["Choose an outplacement provider.", "Offer it as part of the exit package.", "Tell remaining staff what's happening."], "", "", "", false)
      ]
    },
    {
      id: "benefits-cost",
      group: "Benefits & payroll",
      title: "Our Benefits Programs are Becoming Difficult to Sustain",
      blurb: "Your health plan renewal came in far higher than your budget can absorb.",
      lawsuit: false,
      seriousQ: "how far off is the renewal?",
      serious: [
        ["Higher than you hoped", "The renewal is up, and you can still absorb it."],
        ["It breaks the budget", "You cannot keep the same plan at the new price."],
        ["You may have to change coverage", "You are looking at cutting the plan or sharing more of the cost."]
      ],
      first: "Put the renewal notice, the current rates, and your headcount in one place.",
      urgent: "Check the deadline to accept, change, or decline the renewal, and put it on the calendar.",
      options: [
        opt("Review the renewal yourself", "A plain comparison of what you have and what changed.", ["Ask the broker what drove the increase.", "List what employees actually use.", "Decide what you can keep."], "You and your broker", "2–4 weeks", "Your time", false),
        opt("AHEAD reviews the options with you", "AHEAD helps you compare plan designs and what to tell employees, and coordinates with your broker.", ["AHEAD reviews the renewal and your headcount.", "AHEAD lines up the practical choices.", "AHEAD helps you explain the change to employees."], "AHEAD HR advisor", "2–4 weeks", "Quoted by AHEAD", true),
        opt("A benefits review with your broker", "A dedicated meeting to remodel the plan.", ["Send the broker your budget limit.", "Ask for two or three alternatives.", "Decide before the renewal deadline."], "Your broker", "2–4 weeks", "Varies", false)
      ]
    },
    {
      id: "401k",
      group: "Benefits & payroll",
      title: "We want to offer a 401(k), but it's a lot of work",
      blurb: "Plan setup, payroll deductions, testing, filings and fiduciary duties feel like too much to take on.",
      lawsuit: false,
      seriousQ: "where are you with a 401(k)?",
      serious: [
        ["Just exploring", "You want to offer one, and you have not picked a provider."],
        ["Ready to set it up", "You have a provider in mind, and the paperwork looks heavy."],
        ["It is already underway and stuck", "Deductions, testing, or filings are piling up."]
      ],
      first: "Write down who would be eligible and when you would like contributions to start.",
      urgent: "If payroll deductions were promised for a certain date, confirm that date with payroll before you announce it.",
      options: [
        opt("Gather the setup list yourself", "The decisions a provider will ask you for.", ["Choose eligibility and a match, if any.", "Pick who signs the paperwork.", "Ask payroll how deductions will be taken."], "You", "30–60 days", "Your time", false),
        opt("AHEAD coordinates the setup", "AHEAD keeps the provider, payroll, and your decisions moving in one order.", ["AHEAD reviews eligibility and payroll timing.", "AHEAD tracks the paperwork with the provider.", "AHEAD helps you tell employees what to expect."], "AHEAD HR advisor", "30–90 days", "Quoted by AHEAD", true),
        opt("A retirement-plan provider", "A provider that administers the plan, the testing, and the filings.", ["Compare two providers.", "Ask who does the testing and the filings.", "Connect them to payroll before the start date."], "Plan provider", "30–90 days", "Quoted by the provider", false)
      ]
    },
    {
      id: "supplemental",
      group: "Benefits & payroll",
      title: "We want supplemental benefits, but carriers require minimum participation",
      blurb: "Life, disability, dental, vision, accident, hospital indemnity, FSA and Section 125 plans, without the participation hurdles or the paperwork.",
      lawsuit: false,
      seriousQ: "what is blocking the extra benefits?",
      serious: [
        ["You want to offer them", "Life, dental, vision, or similar, and you have not started."],
        ["The carrier wants more people enrolled", "Minimum participation is in the way."],
        ["The paperwork is the problem", "The plans exist, and enrollment is a mess."]
      ],
      first: "List the benefits employees ask for most, and how many people you have.",
      urgent: "If an enrollment window is open now, note the last day before you redesign the offer.",
      options: [
        opt("Ask carriers yourself", "A short list of what you want and what they require.", ["Name the benefits you want.", "Ask each carrier about minimum participation.", "See which ones fit your headcount."], "You and your broker", "2–4 weeks", "Your time", false),
        opt("AHEAD lines up a workable offer", "AHEAD helps you sort participation rules and a simple way for employees to enroll.", ["AHEAD reviews your headcount and what you want to offer.", "AHEAD coordinates with your broker on plans that fit.", "AHEAD helps you explain the choices in plain words."], "AHEAD HR advisor", "2–6 weeks", "Quoted by AHEAD", true),
        opt("A voluntary-benefits provider", "A provider that offers supplemental plans built for smaller groups.", ["Ask how enrollment works.", "Ask what happens if participation is low.", "Pilot with a clear start date."], "Benefits provider", "30–60 days", "Quoted by the provider", false)
      ]
    },
    {
      id: "benefits-headaches",
      group: "Benefits & payroll",
      title: "Benefits headaches",
      blurb: "Enrollment errors, eligibility questions, ACA reporting or confused employees.",
      lawsuit: false,
      seriousQ: "what kind of benefits headache is it?",
      serious: [
        ["A few enrollment questions", "Employees are confused, and the plan itself is fine."],
        ["Errors in eligibility or enrollment", "Someone was added, dropped, or coded wrong."],
        ["Reporting or a carrier dispute", "A reporting task, or the carrier and you do not agree."]
      ],
      first: "Write down the employee question or the error, and the date you found it.",
      urgent: "If someone is waiting on coverage or a card, call the carrier about that person first.",
      options: [
        opt("Untangle it yourself", "One list of who is enrolled and what they asked.", ["Match enrollment to your current roster.", "Correct the one error.", "Reply to the employee in writing."], "You", "This week", "Your time", false),
        opt("AHEAD helps clear the backlog", "AHEAD sorts the errors, talks with the carrier or broker, and gives you a simple enrollment routine.", ["AHEAD reviews the errors and the questions.", "AHEAD coordinates the corrections.", "AHEAD writes the steps your office will follow next time."], "AHEAD HR advisor", "1–3 weeks", "Quoted by AHEAD", true),
        opt("Your broker or carrier rep", "The person who can change the enrollment in the carrier's system.", ["Send them the specific error.", "Ask for written confirmation of the fix.", "Tell the employee when it is done."], "Broker or carrier", "1–3 weeks", "Your time", false)
      ]
    },
    {
      id: "payroll",
      group: "Benefits & payroll",
      title: "Payroll provider problems",
      blurb: "Errors, missed deadlines, poor service or tax filings you can't trust.",
      lawsuit: false,
      seriousQ: "what is going wrong with payroll?",
      serious: [
        ["Service is slow", "You cannot get a clear answer when something looks off."],
        ["Errors on paychecks", "Hours, rates, or deductions have been wrong."],
        ["Tax filings you cannot trust", "Deposits or filings have been late, missed, or questioned."]
      ],
      first: "Save one example of the error, with the pay date and who was affected.",
      urgent: "If a tax deposit or a filing deadline is this week, ask the provider today whether it was sent.",
      options: [
        opt("Make the provider fix the example", "A written correction, not a promise.", ["Send the example and the pay date.", "Ask what caused it.", "Get the correction in writing."], "You and your provider", "1–2 weeks", "Your time", false),
        opt("AHEAD reviews the payroll relationship", "AHEAD looks at the errors, talks with the provider, and helps you decide whether to repair it or move.", ["AHEAD reviews the examples.", "AHEAD outlines what the provider must correct.", "AHEAD helps you set a standard for the next payrolls."], "AHEAD HR advisor", "1–3 weeks", "Quoted by AHEAD", true),
        opt("Move to a new payroll provider", "A planned switch, with tax accounts and balances checked first.", ["List what the new provider must take over.", "Confirm tax accounts before you switch.", "Run one parallel check before the first live payroll."], "New payroll provider", "30–60 days", "Quoted by the provider", false)
      ]
    },
    {
      id: "overtime",
      group: "Benefits & payroll",
      title: "Overtime or classification questions",
      blurb: "Exempt vs. non-exempt, contractor vs. employee, or off-the-clock work.",
      lawsuit: true,
      seriousQ: "what question are you trying to settle?",
      serious: [
        ["Overtime for a few people", "You are not sure who should receive overtime."],
        ["Exempt or contractor status", "A role may be classified the wrong way."],
        ["Off-the-clock work", "Work is happening before or after the recorded hours."]
      ],
      first: "List the roles in question and how those people are paid today.",
      urgent: "If someone is working off the clock this week, stop that practice while you sort out the classification.",
      options: [
        opt("Compare the roles yourself", "A plain look at duties and hours.", ["Write down what the person actually does.", "Compare it to the way they are paid.", "Note anyone whose duties have changed."], "You", "1–2 weeks", "Your time", false),
        opt("AHEAD reviews the classifications", "AHEAD looks at duties, hours, and how similar roles are treated, and helps you correct the setup.", ["AHEAD reviews the roles and the pay setup.", "AHEAD flags the ones to look at first.", "AHEAD helps you adjust schedules, time records, or job descriptions."], "AHEAD HR advisor", "1–3 weeks", "Quoted by AHEAD", true),
        opt("A classification review", "A CPA or employment attorney reviews the roles and how to correct them.", ["Share the job duties, not just the titles.", "Ask which roles to change first.", "Put the change in writing."], "CPA or attorney", "Varies", "Medium", false)
      ]
    },
    {
      id: "compliance",
      group: "Compliance & government",
      title: "Compliance gaps",
      blurb: "Outdated handbook, missing postings, I-9s, required training or new state laws.",
      lawsuit: false,
      seriousQ: "which gap is in front of you?",
      serious: [
        ["You are not sure what is missing", "The handbook, postings, or training may be out of date."],
        ["You know a specific gap", "An I-9, a posting, or a policy you have been meaning to fix."],
        ["A new rule just landed", "A state change, and you have not updated anything yet."]
      ],
      first: "Make a short list of the handbook, the posters, and the I-9s, and note the last time each was touched.",
      urgent: "If a new employee is starting this week, complete their paperwork before you redo the whole handbook.",
      options: [
        opt("Patch the known gap yourself", "One item, done and dated.", ["Pick the gap you already know about.", "Fix that item.", "Note the date and who checked it."], "You", "1–2 weeks", "Your time", false),
        opt("AHEAD does a practical checkup", "AHEAD reviews the handbook, postings, I-9s, and required training and gives you a fix-first list.", ["AHEAD reviews what you have.", "AHEAD lists what to update first.", "AHEAD helps you put the updates in place."], "AHEAD HR advisor", "2–4 weeks", "Quoted by AHEAD", true),
        opt("An HR audit firm", "A fuller outside review of policies and files.", ["Agree on the scope.", "Gather the handbook and the files they ask for.", "Turn their list into a calendar."], "Audit firm", "30–60 days", "Medium", false)
      ]
    },
    {
      id: "tax",
      group: "Compliance & government",
      title: "Received a tax notice",
      blurb: "An IRS or state letter about payroll taxes, penalties or filings.",
      lawsuit: false,
      seriousQ: "what does the notice say?",
      serious: [
        ["Penalty for a late deposit or filing", "A balance due with penalties and interest."],
        ["A mismatch or discrepancy", "Reported wages or tax don't match."],
        ["Audit or a final notice", "An exam, a levy or a demand for payment."]
      ],
      first: "Compare the notice to your deposit and filing records, and ask your payroll provider whether they caused it.",
      urgent: "Find the response deadline on the notice, usually 30 days or less, and put it on your calendar now.",
      options: [
        opt("Have your payroll provider fix it", "If they caused it, they should resolve it and often cover the penalty.", ["Send them the notice right away.", "Get a written resolution.", "Confirm the agency closed it."], "You and your payroll provider", "2–6 weeks", "Your time", false),
        opt("AHEAD coordinates the response", "AHEAD reconciles your records, works with your payroll provider and CPA, and tracks the notice until it's closed.", ["AHEAD reviews the notice and your filings.", "AHEAD drafts the response and any corrections.", "AHEAD follows up until the agency closes it."], "", "", "", true),
        opt("CPA or enrolled agent", "A tax professional who can represent you before the agency.", ["Sign a power of attorney.", "Request penalty abatement.", "Set up a payment plan if needed."], "CPA or EA", "Varies", "Medium", false)
      ]
    },
    {
      id: "inquiry",
      group: "Compliance & government",
      title: "Government inquiry about an employee complaint",
      blurb: "A charge or letter from the EEOC, DOL, OSHA, NLRB or a state agency.",
      lawsuit: true,
      seriousQ: "what did the agency send?",
      serious: [
        ["A letter or a charge", "You received something and have not responded."],
        ["They asked for documents", "A deadline is attached to records they want."],
        ["An investigator is involved", "Someone from the agency wants to talk, or a response is overdue."]
      ],
      first: "Read the letter for the response date, and put that date on the calendar before you do anything else.",
      urgent: "The response date is printed on the letter. Treat that date as this week's deadline.",
      options: [
        opt("Gather the file yourself", "The records the letter describes.", ["Note the date and what they asked for.", "Pull the personnel file and the related notes.", "Read your draft twice before anything goes out."], "You", "This week", "Your time", false),
        opt("AHEAD helps you prepare the response", "AHEAD organizes the file, drafts a factual response, and tracks the deadline with you.", ["AHEAD reviews the letter and the file.", "AHEAD drafts a factual timeline.", "AHEAD stays with you until the response goes out."], "AHEAD HR advisor", "Based on the letter's date", "Quoted by AHEAD", true),
        opt("An employment attorney", "A lawyer to handle the response when an agency is already involved.", ["Share the letter and the date.", "Give them the file.", "Agree on who sends the response."], "Employment attorney", "Based on the letter's date", "Medium", false)
      ]
    },
    {
      id: "leave",
      group: "Compliance & government",
      title: "Leave or accommodation request",
      blurb: "FMLA, disability accommodations, pregnancy, or state paid-leave requests.",
      lawsuit: true,
      seriousQ: "what kind of request is it?",
      serious: [
        ["A few days off", "A short leave, and you are not sure how to handle it."],
        ["An ongoing accommodation", "A change to duties, schedule, or equipment."],
        ["A longer leave", "Pregnancy, a serious health condition, or a state paid-leave request."]
      ],
      first: "Write down what the employee asked for, and the date they asked.",
      urgent: "Reply that you received the request this week, even if the decision comes later.",
      options: [
        opt("Handle the request yourself", "A written note of what was asked and what you can do.", ["Ask what they need, in practical terms.", "Check how you have handled similar requests.", "Reply in writing."], "You", "This week", "Your time", false),
        opt("AHEAD helps you respond", "AHEAD reviews the request, the schedule, and how similar requests were handled, and drafts the reply.", ["AHEAD reviews what was asked.", "AHEAD outlines options that keep the work covered.", "AHEAD drafts the written reply."], "AHEAD HR advisor", "A few days to 2 weeks", "Quoted by AHEAD", true),
        opt("A leave administrator", "A partner who tracks the leave paperwork and the dates.", ["Send them the request and the dates.", "Ask what you still decide.", "Keep the employee's job status clear with payroll."], "Leave administrator", "1–2 weeks", "Quoted by the administrator", false)
      ]
    },
    {
      id: "unemployment",
      group: "Compliance & government",
      title: "Unemployment claim filed",
      blurb: "A former employee filed for unemployment and the state wants your response.",
      lawsuit: true,
      seriousQ: "where is the claim?",
      serious: [
        ["You just got the notice", "The state wants a response, and you have not sent one."],
        ["You are not sure of the reason", "The person left, and the story is unclear."],
        ["A hearing is scheduled", "A date is set for you to tell your side."]
      ],
      first: "Find the response deadline on the notice and put it on the calendar.",
      urgent: "These notices often allow only a short time to respond. Start with the date printed on yours.",
      options: [
        opt("Respond yourself", "A factual account of why the person left.", ["Read the questions on the notice.", "Answer from the file, not from memory alone.", "Send it before the deadline."], "You", "By the date on the notice", "Your time", false),
        opt("AHEAD prepares the response", "AHEAD reviews the file and the notice and helps you send a consistent, factual response.", ["AHEAD reviews the notice and the separation notes.", "AHEAD drafts the answers.", "AHEAD checks the deadline with you before it goes."], "AHEAD HR advisor", "By the date on the notice", "Quoted by AHEAD", true),
        opt("A hearing representative", "Someone who can attend if the state sets a hearing.", ["Share the notice and the file.", "Agree on who will speak.", "Bring the notes you already have."], "Representative", "The hearing date", "Medium", false)
      ]
    },
    {
      id: "injury",
      group: "Safety",
      title: "An employee was injured on the job",
      blurb: "Someone got hurt at work, and you need to handle care, reporting and the workers' comp claim the right way.",
      lawsuit: true,
      seriousQ: "how serious was the injury?",
      serious: [
        ["First aid and back to work", "The person was treated and returned to the shift."],
        ["Medical care is underway", "A doctor is involved, and time away is likely."],
        ["It is serious", "Emergency care, or the person cannot work."]
      ],
      first: "Write down what happened, where, when, and who saw it. Get the person care.",
      urgent: "Report the injury to your workers' comp carrier as soon as you know medical care is involved.",
      options: [
        opt("Manage the claim yourself", "Care first, then the carrier report and the notes.", ["Make sure the person gets care.", "Report it to the carrier.", "Keep a simple log of work status."], "You", "This week", "Your time", false),
        opt("AHEAD coordinates the response", "AHEAD helps you report the claim, talk with the employee, and keep the work status clear.", ["AHEAD reviews what happened.", "AHEAD helps you complete the carrier report.", "AHEAD outlines a return-to-work conversation."], "AHEAD HR advisor", "This week", "Quoted by AHEAD", true),
        opt("Your workers' comp carrier and clinic", "The carrier manages the claim, and a clinic handles care.", ["Call the carrier.", "Send the employee to the right clinic if you have one.", "Follow the carrier's reporting list."], "Carrier", "This week", "Through your workers' comp policy", false)
      ]
    },
    {
      id: "injuries",
      group: "Safety",
      title: "Frequent employee injuries",
      blurb: "Rising workers' comp claims, near misses or the same injuries happening again.",
      lawsuit: true,
      seriousQ: "what pattern are you seeing?",
      serious: [
        ["A few near misses", "Nobody has been seriously hurt, and the close calls are adding up."],
        ["The same injury keeps happening", "One task or one area shows up again."],
        ["More people are getting hurt", "Injuries are showing up more often than they used to."]
      ],
      first: "List the recent injuries and near misses, with the task and the area.",
      urgent: "If the same task hurt someone this month, pause that task long enough to see what is going wrong.",
      options: [
        opt("Walk the area yourself", "Look at the task with the people who do it.", ["Go to the place where it happened.", "Ask the crew what gets skipped when it is busy.", "Fix one thing this week."], "You and your supervisors", "This week", "Your time", false),
        opt("AHEAD helps you slow the pattern", "AHEAD reviews the incidents, the reporting, and the conversations with supervisors.", ["AHEAD reviews the incident list.", "AHEAD helps you pick the one task to fix first.", "AHEAD drafts a simple reporting routine."], "AHEAD HR advisor", "1–3 weeks", "Quoted by AHEAD", true),
        opt("A safety consultant", "An outside look at the task, the equipment, and the training.", ["Walk them through the recent incidents.", "Ask for the top changes to make.", "Assign a supervisor to each one."], "Safety consultant", "2–4 weeks", "Medium", false)
      ]
    }
  ];

  var state = blank();
  var advanceTimer = 0;

  function advance(fn) {
    window.clearTimeout(advanceTimer);
    advanceTimer = window.setTimeout(fn, 280);
  }

  function blank() {
    return {
      screen: "name",
      name: "",
      group: "People & performance",
      issueId: "",
      serious: "",
      urgency: "",
      lawsuit: "",
      role: "",
      size: "",
      usState: "Wisconsin",
      notes: "",
      company: "",
      email: "",
      phone: "",
      bestTime: "",
      include: true,
      confirmed: false,
      error: ""
    };
  }

  function issue() {
    for (var i = 0; i < ISSUES.length; i++) if (ISSUES[i].id === state.issueId) return ISSUES[i];
    return null;
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function steps(n) {
    var labels = ["1 Pick the issue", "2 Describe the situation", "3 Get your plan"];
    var html = "<ol class=\"steps\">";
    for (var i = 0; i < labels.length; i++) {
      var cls = i + 1 === n ? "on" : (i + 1 < n ? "done" : "");
      html += "<li class=\"" + cls + "\">" + labels[i] + "</li>";
    }
    return html + "</ol>";
  }

  function back(screen, label) {
    return "<button type=\"button\" class=\"linkish\" data-go=\"" + screen + "\">" + esc(label) + "</button>";
  }

  function render() {
    var app = document.getElementById("app");
    app.className = "stage";
    var html = "";
    if (state.screen === "name") html = screenName();
    else if (state.screen === "thanks") html = screenThanks();
    else if (state.screen === "issues") html = screenIssues();
    else if (state.screen === "serious") html = screenSerious();
    else if (state.screen === "urgency") html = screenUrgency();
    else if (state.screen === "lawsuit") html = screenLawsuit();
    else if (state.screen === "business") html = screenBusiness();
    else if (state.screen === "notes") html = screenNotes();
    else html = screenPlan();
    app.innerHTML = html;
    app.style.animation = "none";
    void app.offsetWidth;
    app.style.animation = "";
    bind(app);
    window.scrollTo(0, 0);
  }

  function screenName() {
    return "<div class=\"narrow\"><p class=\"kicker\">AHEAD Human Resources</p><h1>Who am I chatting with?</h1><p class=\"helper\">Your first name is enough. We'll use it as we go.</p><label class=\"field\" for=\"first-name\">First name</label><input id=\"first-name\" type=\"text\" maxlength=\"40\" autocomplete=\"given-name\" value=\"" + esc(state.name) + "\"><p class=\"err\" id=\"name-err\"></p><div class=\"row-actions\"><button type=\"button\" class=\"btn\" id=\"name-next\">Continue</button></div></div>";
  }

  function screenThanks() {
    return "<div class=\"narrow\"><h1>Thanks, " + esc(state.name) + ".</h1><p class=\"helper\">Three easy steps. Pick the issue, describe the situation, and get a plan.</p><div class=\"row-actions\"><button type=\"button\" class=\"btn\" data-go=\"issues\">Continue</button></div></div>";
  }

  function screenIssues() {
    var counts = {};
    GROUPS.forEach(function (g) { counts[g] = 0; });
    ISSUES.forEach(function (item) { counts[item.group] += 1; });
    var tabs = GROUPS.map(function (g) {
      return "<button type=\"button\" class=\"tab" + (state.group === g ? " on" : "") + "\" data-group=\"" + esc(g) + "\">" + esc(g) + " " + counts[g] + "</button>";
    }).join("");
    tabs += "<button type=\"button\" class=\"tab" + (state.group === "all" ? " on" : "") + "\" data-group=\"all\">See all 21</button>";
    var list = ISSUES.filter(function (item) { return state.group === "all" || item.group === state.group; });
    var cards = list.map(function (item) {
      return "<button type=\"button\" class=\"issue\" data-issue=\"" + esc(item.id) + "\"><span class=\"pill\">" + esc(item.group) + "</span><strong>" + esc(item.title) + "</strong><span>" + esc(item.blurb) + "</span></button>";
    }).join("");
    return steps(1) + "<h1>What problem are you dealing with?</h1><p class=\"helper\">Choose the issue that's closest. Tell us a little about your situation, and you'll get your options plus a plan written for your business.</p><div class=\"tabs\">" + tabs + "</div><div class=\"cards\">" + cards + "</div>";
  }

  function screenSerious() {
    var item = issue();
    var choices = item.serious.map(function (pair, idx) {
      var on = state.serious === pair[0] ? " on" : "";
      return "<button type=\"button\" class=\"choice" + on + "\" data-serious=\"" + idx + "\"><strong>" + esc(pair[0]) + "</strong><em>" + esc(pair[1]) + "</em></button>";
    }).join("");
    return steps(2) + "<div class=\"narrow\"><p class=\"kicker\">Describe the situation</p><h1>" + esc(state.name) + ", " + esc(item.seriousQ) + "</h1><div>" + choices + "</div>" + back("issues", "Back to issues") + "</div>";
  }

  function screenUrgency() {
    var choices = URGENCY.map(function (label) {
      return "<button type=\"button\" class=\"choice\" data-urgency=\"" + esc(label) + "\"><strong>" + esc(label) + "</strong></button>";
    }).join("");
    return steps(2) + "<div class=\"narrow\"><p class=\"kicker\">Describe the situation</p><h1>" + esc(state.name) + ", how soon does this need to be handled?</h1><div>" + choices + "</div>" + back("serious", "Back to the previous question") + "</div>";
  }

  function screenLawsuit() {
    return steps(2) + "<div class=\"narrow\"><p class=\"kicker\">Describe the situation</p><h1>" + esc(state.name) + ", has the employee or a former employee filed a lawsuit through an attorney?</h1><p class=\"helper\">Only answer yes if a lawsuit has actually been filed in court. A complaint, an agency charge or an attorney's letter is not a lawsuit.</p><button type=\"button\" class=\"choice\" data-lawsuit=\"No\"><strong>No</strong><em>No lawsuit has been filed.</em></button><button type=\"button\" class=\"choice\" data-lawsuit=\"Yes, a lawsuit has been filed\"><strong>Yes, a lawsuit has been filed</strong><em>You've been served, or an attorney has filed a complaint in court.</em></button>" + back("urgency", "Back to the previous question") + "</div>";
  }

  function screenBusiness() {
    return steps(2) + "<div class=\"narrow\"><p class=\"kicker\">Describe the situation</p><h1>" + esc(state.name) + ", tell us a little about your business</h1><p class=\"helper\">This helps us check which laws apply to you.</p><div class=\"grid-3\"><div><label class=\"field\" for=\"role\">Your role</label><select id=\"role\">" + options(ROLES, state.role, "Choose one") + "</select></div><div><label class=\"field\" for=\"size\">Company size</label><select id=\"size\">" + options(SIZES, state.size, "Choose one") + "</select></div><div><label class=\"field\" for=\"us-state\">State</label><select id=\"us-state\">" + options(STATES, state.usState || "Wisconsin", "") + "</select></div></div><p class=\"err\">" + esc(state.error) + "</p><div class=\"row-actions\"><button type=\"button\" class=\"btn\" id=\"business-next\">Continue</button></div>" + back(issue().lawsuit ? "lawsuit" : "urgency", "Back to the previous question") + "</div>";
  }

  function screenNotes() {
    return steps(2) + "<div class=\"narrow\"><p class=\"kicker\">Describe the situation</p><h1>" + esc(state.name) + ", what happened?</h1><p class=\"helper\">Tell us as much as you're willing to tell us about the situation.</p><textarea id=\"notes\" maxlength=\"2000\" placeholder=\"For example: A shift lead reported that her supervisor has made comments about her age in team meetings. She told me on Monday, and the supervisor has been here 8 years.\">" + esc(state.notes) + "</textarea><p class=\"count\"><span id=\"note-count\">" + state.notes.length + "</span> / 2,000 characters</p><p class=\"note\">Describe roles and events, not people. Leave out names, Social Security numbers, medical details and other personal information.</p><div class=\"row-actions\"><button type=\"button\" class=\"btn\" id=\"notes-next\">Next</button><button type=\"button\" class=\"btn secondary\" id=\"notes-skip\">Skip this question</button></div>" + back("business", "Back to the previous question") + "</div>";
  }

  function screenPlan() {
    var item = issue();
    var facts = [
      ["First name", state.name],
      ["Issue", item.title],
      ["Category", item.group],
      ["Situation", state.serious || "Not given"],
      ["Urgency", state.urgency || "Not given"]
    ];
    if (item.lawsuit) facts.push(["Lawsuit filed", state.lawsuit || "Not given"]);
    facts.push(["Your role", state.role || "Not given"]);
    facts.push(["Company size", state.size || "Not given"]);
    facts.push(["State", state.usState || "Not given"]);
    var factHtml = facts.map(function (pair) {
      return "<div><small>" + esc(pair[0]) + "</small><p>" + esc(pair[1]) + "</p></div>";
    }).join("");
    var plans = item.options.map(function (card, idx) {
      var stepsHtml = card.steps.map(function (step) { return "<li>" + esc(step) + "</li>"; }).join("");
      var meta = "";
      if (card.who || card.timeline || card.cost) {
        meta = "<div class=\"meta\">" + metaBit("Who helps", card.who) + metaBit("Timeline", card.timeline) + metaBit("Cost", card.cost) + "</div>";
      }
      return "<article class=\"plan" + (card.recommended ? " recommended" : "") + "\"><small>Option " + (idx + 1) + "</small> " + (card.recommended ? "<span class=\"badge\">Recommended for you</span>" : "") + "<h3>" + esc(card.title) + "</h3><p>" + esc(card.body) + "</p><ol>" + stepsHtml + "</ol>" + meta + "</article>";
    }).join("");
    return steps(3) + "<p class=\"kicker\">Get your plan</p><h1>" + esc(state.name) + ", here are your options for: " + esc(item.title) + "</h1><section class=\"recap\"><div class=\"recap-head\"><h2>What you told us</h2><button type=\"button\" class=\"linkish\" data-go=\"serious\">Edit answers</button></div><div class=\"facts\">" + factHtml + "</div><div><small>Your notes</small><p>" + esc(state.notes ? state.notes : "Not given") + "</p></div></section><div class=\"callouts\"><article class=\"callout do\"><p class=\"tag\">Do this first</p><p>" + esc(item.first) + "</p></article><article class=\"callout soon\"><p class=\"tag\">Time-sensitive</p><p>" + esc(item.urgent) + "</p></article></div><div class=\"plans\">" + plans + "</div>" + talk();
  }

  function metaBit(label, value) {
    if (!value) return "";
    return "<div><small>" + esc(label) + "</small><p>" + esc(value) + "</p></div>";
  }

  function talk() {
    var form = state.confirmed ? confirmBox() : callForm();
    return "<section class=\"talk-wrap\"><div class=\"talk-copy\"><h2>Talk to AHEAD Human Resources</h2><p>An AHEAD advisor can review your situation, check the rules for your state and help you take the next step.</p><div class=\"contact\"><div><small>CALL</small><a href=\"tel:9205931208\">" + PHONE + "</a></div><button type=\"button\" class=\"ghost\" data-copy=\"" + PHONE + "\">Copy</button></div><div class=\"contact\"><div><small>EMAIL</small><a href=\"mailto:" + EMAIL + "\">" + EMAIL + "</a></div><button type=\"button\" class=\"ghost\" data-copy=\"" + EMAIL + "\">Copy</button></div><div class=\"book\"><a href=\"" + SCHEDULER + "\" target=\"_blank\" rel=\"noopener noreferrer\">Book a time with Jim</a></div></div><div class=\"call-card\">" + form + "</div></section>";
  }

  function callForm() {
    return "<h2>" + esc(state.name) + ", would you like AHEAD to call you?</h2><div class=\"grid-2\"><div><label class=\"field\" for=\"call-name\">Your name</label><input id=\"call-name\" type=\"text\" maxlength=\"80\" value=\"" + esc(state.name) + "\"></div><div><label class=\"field\" for=\"call-company\">Company</label><input id=\"call-company\" type=\"text\" maxlength=\"80\" value=\"" + esc(state.company) + "\"></div><div><label class=\"field\" for=\"call-email\">Email</label><input id=\"call-email\" type=\"email\" maxlength=\"120\" value=\"" + esc(state.email) + "\"></div><div><label class=\"field\" for=\"call-phone\">Phone</label><input id=\"call-phone\" type=\"tel\" maxlength=\"30\" value=\"" + esc(state.phone) + "\"></div></div><label class=\"field\" for=\"call-time\">Best time to reach you</label><input id=\"call-time\" type=\"text\" maxlength=\"80\" placeholder=\"e.g. Weekday mornings\" value=\"" + esc(state.bestTime) + "\"><label class=\"check\"><input id=\"call-include\" type=\"checkbox\"" + (state.include ? " checked" : "") + "> Include my answers, notes and plan so the advisor has the background</label><p class=\"err\">" + esc(state.error) + "</p><div class=\"row-actions\"><button type=\"button\" class=\"btn\" id=\"call-request\">Request a call from AHEAD</button><button type=\"button\" class=\"linkish\" id=\"copy-summary\">Copy a summary instead</button></div>";
  }

  function confirmBox() {
    return "<div class=\"confirm\"><h2>Thanks, " + esc(state.name) + ".</h2><p>This is a preview, so nothing was sent. No one at AHEAD has been emailed, texted, or notified.</p><p>You can still call " + PHONE + ", email " + EMAIL + ", or book a time above.</p><button type=\"button\" class=\"linkish\" id=\"copy-summary\">Copy a summary instead</button></div>";
  }

  function options(list, selected, placeholder) {
    var html = placeholder ? "<option value=\"\">" + esc(placeholder) + "</option>" : "";
    list.forEach(function (item) {
      html += "<option" + (item === selected ? " selected" : "") + ">" + esc(item) + "</option>";
    });
    return html;
  }

  function go(screen) {
    window.clearTimeout(advanceTimer);
    state.screen = screen;
    state.error = "";
    render();
  }

  function afterUrgency() {
    go(issue().lawsuit ? "lawsuit" : "business");
  }

  function bind(root) {
    root.querySelectorAll("[data-go]").forEach(function (el) {
      el.addEventListener("click", function () { go(el.getAttribute("data-go")); });
    });
    root.querySelectorAll("[data-group]").forEach(function (el) {
      el.addEventListener("click", function () { state.group = el.getAttribute("data-group"); render(); });
    });
    root.querySelectorAll("[data-issue]").forEach(function (el) {
      el.addEventListener("click", function () {
        var next = el.getAttribute("data-issue");
        if (next !== state.issueId) {
          state.serious = "";
          state.lawsuit = "";
        }
        state.issueId = next;
        go("serious");
      });
    });
    root.querySelectorAll("[data-serious]").forEach(function (el) {
      el.addEventListener("click", function () {
        var item = issue();
        el.classList.add("on");
        state.serious = item.serious[Number(el.getAttribute("data-serious"))][0];
        advance(function () { go("urgency"); });
      });
    });
    root.querySelectorAll("[data-urgency]").forEach(function (el) {
      el.addEventListener("click", function () {
        el.classList.add("on");
        state.urgency = el.getAttribute("data-urgency");
        advance(afterUrgency);
      });
    });
    root.querySelectorAll("[data-lawsuit]").forEach(function (el) {
      el.addEventListener("click", function () {
        el.classList.add("on");
        state.lawsuit = el.getAttribute("data-lawsuit");
        advance(function () { go("business"); });
      });
    });
    var nameNext = root.querySelector("#name-next");
    if (nameNext) {
      var input = root.querySelector("#first-name");
      function submitName() {
        var value = input.value.replace(/\s+/g, " ").trim();
        if (!value) {
          root.querySelector("#name-err").textContent = "Please add your first name.";
          input.focus();
          return;
        }
        state.name = value.slice(0, 40);
        go("thanks");
      }
      nameNext.addEventListener("click", submitName);
      input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") { event.preventDefault(); submitName(); }
      });
      input.focus();
    }
    var business = root.querySelector("#business-next");
    if (business) {
      business.addEventListener("click", function () {
        state.role = root.querySelector("#role").value;
        state.size = root.querySelector("#size").value;
        state.usState = root.querySelector("#us-state").value;
        if (!state.role || !state.size || !state.usState) {
          state.error = "Please choose your role, company size, and state.";
          render();
          return;
        }
        go("notes");
      });
    }
    var notes = root.querySelector("#notes");
    if (notes) {
      notes.addEventListener("input", function () {
        root.querySelector("#note-count").textContent = String(notes.value.length);
      });
      root.querySelector("#notes-next").addEventListener("click", function () {
        state.notes = notes.value.slice(0, 2000);
        go("plan");
      });
      root.querySelector("#notes-skip").addEventListener("click", function () {
        state.notes = "";
        go("plan");
      });
    }
    root.querySelectorAll("[data-copy]").forEach(function (el) {
      el.addEventListener("click", function () { copyText(el.getAttribute("data-copy"), el); });
    });
    var request = root.querySelector("#call-request");
    if (request) {
      request.addEventListener("click", function () {
        state.name = root.querySelector("#call-name").value.replace(/\s+/g, " ").trim() || state.name;
        state.company = root.querySelector("#call-company").value.trim();
        state.email = root.querySelector("#call-email").value.trim();
        state.phone = root.querySelector("#call-phone").value.trim();
        state.bestTime = root.querySelector("#call-time").value.trim();
        state.include = root.querySelector("#call-include").checked;
        if (!state.email || !state.phone) {
          state.error = "Add an email and a phone number. This preview still will not send them.";
          render();
          return;
        }
        state.confirmed = true;
        state.error = "";
        render();
      });
    }
    var summary = root.querySelector("#copy-summary");
    if (summary) summary.addEventListener("click", function () { copyText(summaryText(), summary); });
  }

  function summaryText() {
    var item = issue();
    var lines = [
      "AHEAD HR Issue Navigator preview",
      "Name: " + state.name,
      "Company: " + (state.company || "Not given"),
      "Email: " + (state.email || "Not given"),
      "Phone: " + (state.phone || "Not given"),
      "Best time: " + (state.bestTime || "Not given"),
      "Issue: " + (item ? item.title : ""),
      "Situation: " + (state.serious || "Not given"),
      "Urgency: " + (state.urgency || "Not given"),
      "Lawsuit: " + (item && item.lawsuit ? (state.lawsuit || "Not given") : "Not asked"),
      "Role: " + (state.role || "Not given"),
      "Company size: " + (state.size || "Not given"),
      "State: " + (state.usState || "Not given"),
      "Notes: " + (state.notes || "Not given"),
      "Include answers: " + (state.include ? "yes" : "no"),
      "",
      DISCLAIMER,
      "",
      "Preview only. Nothing was sent."
    ];
    return lines.join("\n");
  }

  function copyText(text, button) {
    var done = function () {
      var old = button.textContent;
      button.textContent = "Copied";
      window.setTimeout(function () { button.textContent = old; }, 1200);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text); done(); });
    } else {
      fallbackCopy(text);
      done();
    }
  }

  function fallbackCopy(text) {
    var area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    try { document.execCommand("copy"); } catch (err) {}
    document.body.removeChild(area);
  }

  document.addEventListener("submit", function (event) { event.preventDefault(); }, true);

  document.getElementById("start-over").addEventListener("click", function () {
    if (state.screen !== "name" && !window.confirm("Start over? Your answers on this page will be cleared. Nothing was sent.")) return;
    state = blank();
    render();
  });

  document.getElementById("brand-home").addEventListener("click", function (event) {
    event.preventDefault();
    if (state.screen !== "name") go("issues");
  });

  render();

  window.__AHEAD_PREVIEW = { issues: ISSUES, disclaimer: DISCLAIMER };

  if (window.location.search.indexOf("selftest=1") !== -1) runSelfTest();

  function runSelfTest() {
    var log = [];
    function assert(ok, msg) { log.push((ok ? "PASS " : "FAIL ") + msg); }
    function h1() {
      var el = document.querySelector("#app h1");
      return el ? el.textContent : "";
    }
    function fits() {
      return document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1;
    }
    function wait(ms) { return new Promise(function (resolve) { window.setTimeout(resolve, ms); }); }
    function q(sel) { return document.querySelector(sel); }
    async function flow() {
      assert(h1() === "Who am I chatting with?", "opens with who am I chatting with, got: " + h1());
      assert(fits(), "name screen fits");
      q("#first-name").value = "Sam";
      q("#name-next").click();
      assert(h1() === "Thanks, Sam.", "thanks uses the name, got: " + h1());
      q("[data-go='issues']").click();
      q("[data-group='all']").click();
      assert(document.querySelectorAll(".issue").length === 21, "21 issue cards");
      assert(fits(), "issue screen fits");
      q("[data-issue='problem']").click();
      assert(h1().indexOf("Sam, how serious has it gotten?") === 0, "serious question uses the name");
      q("[data-serious='0']").click();
      await wait(400);
      assert(h1().indexOf("Sam, how soon") === 0, "single choice auto-advanced to timing");
      q("[data-urgency='Urgent: this week']").click();
      await wait(400);
      assert(h1().indexOf("lawsuit") !== -1, "lawsuit question for a problem employee");
      q("[data-lawsuit='No']").click();
      await wait(400);
      q("#role").value = "Owner / operator";
      q("#size").value = "1 – 10 employees";
      q("#us-state").value = "Wisconsin";
      q("#business-next").click();
      assert(h1().indexOf("Sam, what happened?") === 0, "what happened uses the name");
      q("#notes-skip").click();
      var plan = document.querySelector("#app").textContent;
      assert(plan.indexOf("Write down specific incidents with dates. Then have a direct, private conversation about expectations.") !== -1, "problem employee do this first");
      assert(plan.indexOf("If there's a safety threat, remove the person from the workplace now with paid administrative leave, then call AHEAD.") !== -1, "problem employee time-sensitive");
      assert(plan.indexOf("AHEAD drafts the warnings, coaches your manager and keeps the paper trail consistent and defensible.") !== -1, "problem employee ahead plan");
      assert(plan.indexOf("Recommended for you") !== -1, "recommended badge");
      assert(plan.indexOf("What you told us") !== -1, "recap");
      assert(plan.indexOf("upload") === -1 && plan.indexOf("Get my AHEAD") === -1, "no upload or AI plan");
      assert(fits(), "plan screen fits");
      q("#call-email").value = "sam@example.com";
      q("#call-phone").value = "9205550100";
      q("#call-request").click();
      assert(document.body.textContent.indexOf("nothing was sent") !== -1, "confirmation does not claim a send");
      var tax = null;
      window.__AHEAD_PREVIEW.issues.forEach(function (item) { if (item.id === "tax") tax = item; });
      assert(tax && tax.lawsuit === false, "tax notice omits lawsuit");
      assert(tax.options[1].steps[1] === "AHEAD drafts the response and any corrections.", "tax ahead step");
      assert(tax.first.indexOf("ask your payroll provider whether they caused it.") !== -1, "tax do this first");
      var term = null;
      window.__AHEAD_PREVIEW.issues.forEach(function (item) { if (item.id === "termination") term = item; });
      assert(term.options[1].steps[1] === "AHEAD prepares final pay, COBRA and", "termination visible step");
      assert(document.body.textContent.indexOf(window.__AHEAD_PREVIEW.disclaimer) !== -1, "disclaimer verbatim");
      var failed = log.filter(function (line) { return line.indexOf("FAIL") === 0; });
      var pre = document.createElement("pre");
      pre.id = "selftest";
      pre.textContent = log.join("\n");
      document.body.appendChild(pre);
      document.title = failed.length ? "FAIL " + failed.length : "PASS";
    }
    flow();
  }
})();
