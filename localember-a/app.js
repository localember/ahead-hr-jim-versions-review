/* Preview only. This file never sends a request. Questions and options are Jim's
   combined workflow, word for word. The end line is the preview wording. */
(function () {
  "use strict";

  window.fetch = function () {
    return Promise.reject(new Error("Preview does not send."));
  };
  if (window.XMLHttpRequest) {
    XMLHttpRequest.prototype.open = function () {};
    XMLHttpRequest.prototype.send = function () {};
  }

  var STAFFING = "Staffing or recruiting";
  var AGENCY = "Already using a staffing agency";

  var STEPS = {
    primary: {
      title: "What are you primarily looking for?",
      help: "Select the main area you want help with.",
      type: "single",
      field: "primaryNeed",
      options: [
        "Payroll services",
        "HR support & compliance",
        "Full HR + payroll package",
        "Staffing or recruiting",
        "Workforce tools / HRIS (UKG)",
        "Just exploring options"
      ]
    },
    areas: {
      title: "Which areas are most important to you?",
      help: "Select all that apply.",
      type: "multi",
      field: "services",
      options: [
        "Payroll processing & tax filings",
        "Compliance & policy support",
        "Benefits assistance",
        "Employee handbook",
        "Workers\u2019 compensation help",
        "Time & attendance",
        "Recruiting or staffing",
        "HRIS / workforce tools",
        "Other"
      ],
      other: {
        field: "otherServices",
        label: "Please describe *",
        placeholder: "Describe the other service or need",
        message: "Please describe the other service or need."
      }
    },
    setup: {
      title: "How are you handling payroll and HR today?",
      help: "This helps us understand the best next step for you.",
      type: "single",
      field: "currentSetup",
      options: [
        "Doing it ourselves (in-house)",
        "Using software only (QuickBooks, etc.)",
        "Handled by an accountant or bookkeeper",
        "Already with a payroll or HR provider",
        "Already using a staffing agency",
        "A mix of the above"
      ],
      extraWhen: AGENCY,
      extraHelp: "Optional \u2014 tell us about your current staffing agency (you can skip this)",
      extraFields: [
        { field: "staffingAgency", label: "Staffing agency name(s)", placeholder: "Agency name(s)" },
        { field: "staffingMarkup", label: "Markup percentage (if known)", placeholder: "e.g. 45%, 1.45, etc." }
      ]
    },
    industry: {
      title: "What industry is your business in?",
      help: "We support a wide range of Wisconsin businesses.",
      type: "single",
      field: "industry",
      options: [
        "Manufacturing",
        "Retail",
        "Healthcare",
        "Hospitality",
        "Service",
        "Professional / Legal",
        "Other"
      ]
    },
    employees: {
      title: "How many employees does your company have?",
      help: "This helps us match the level of support that fits your business.",
      type: "single",
      field: "companySize",
      options: [
        "1 \u2013 10 employees",
        "11 \u2013 20 employees",
        "21 \u2013 50 employees",
        "51 \u2013 100 employees",
        "101+ employees"
      ]
    },
    hrContact: {
      title: "Let\u2019s talk about your needs",
      help: "When are you hoping to get started, and how can we reach you?",
      type: "contact",
      bucket: "hr",
      timeline: {
        label: "When are you hoping to get started?",
        options: ["ASAP", "30 days", "1\u20133 months", "Researching"]
      },
      fields: [
        { field: "fullName", label: "Full Name *", placeholder: "Your name", required: true, autocomplete: "name" },
        { field: "email", label: "Email *", type: "email", placeholder: "you@company.com", required: true, autocomplete: "email" },
        { field: "phone", label: "Phone", type: "tel", placeholder: "(920) 555-0123", autocomplete: "tel" },
        { field: "company", label: "Company Name *", placeholder: "Your company", required: true, autocomplete: "organization" },
        { field: "role", label: "Your Role", placeholder: "e.g., Owner, Office Manager", autocomplete: "organization-title" },
        { field: "notes", label: "Anything else we should know?", placeholder: "Optional notes", textarea: true }
      ]
    },
    service: {
      title: "What type of staffing do you need?",
      help: "Select the main service that fits your situation.",
      type: "single",
      field: "serviceType",
      options: [
        "Temporary staffing",
        "Temp-to-hire",
        "Direct hire",
        "Payrolling (you recruit, we employ)",
        "Short-term / project-based",
        "Long-term / ongoing",
        "On-site management",
        "Seasonal / peak demand",
        "Volume / high-volume hiring",
        "Specialized / skilled trades"
      ]
    },
    jobs: {
      title: "What type of workers do you need?",
      help: "Select all that apply.",
      type: "multi",
      field: "jobCategories",
      options: [
        "Light industrial",
        "Warehouse / distribution",
        "Machine operators",
        "Assembly / production",
        "General labor",
        "Forklift / material handling",
        "Packaging / shipping",
        "Maintenance / facilities",
        "Administrative / clerical",
        "Customer service",
        "Professional / skilled",
        "Construction / trades",
        "Other"
      ],
      other: {
        field: "otherJobs",
        label: "Please describe *",
        placeholder: "Describe the role or skill needed",
        message: "Please describe the other role or skill."
      }
    },
    workers: {
      title: "How many workers do you need?",
      help: "Approximate number is fine.",
      type: "single",
      field: "volume",
      options: [
        "1 \u2013 5",
        "6 \u2013 15",
        "16 \u2013 30",
        "31 \u2013 50",
        "51+",
        "Ongoing / as needed"
      ]
    },
    start: {
      title: "When do you need them to start?",
      help: "Select the timeline that best fits.",
      type: "single",
      field: "stTimeline",
      options: [
        "As soon as possible",
        "Within 1 week",
        "Within 2 weeks",
        "Within 30 days",
        "Just planning / exploring"
      ]
    },
    stContact: {
      title: "Let\u2019s get you connected",
      help: "Share your details and a staffing specialist will reach out.",
      type: "contact",
      bucket: "st",
      fields: [
        { field: "fullName", label: "Full Name *", placeholder: "Your name", required: true, autocomplete: "name" },
        { field: "email", label: "Email *", type: "email", placeholder: "you@company.com", required: true, autocomplete: "email" },
        { field: "phone", label: "Phone", type: "tel", placeholder: "(920) 555-0123", autocomplete: "tel" },
        { field: "company", label: "Company Name *", placeholder: "Your company", required: true, autocomplete: "organization" },
        { field: "location", label: "Location / area", placeholder: "City or area in Wisconsin" },
        { field: "notes", label: "Additional details", placeholder: "Shift times, certifications, experience level, etc.", textarea: true }
      ]
    }
  };

  var HR_FLOW = ["primary", "areas", "setup", "industry", "employees", "hrContact"];
  var ST_FLOW = ["primary", "service", "jobs", "workers", "start", "stContact"];
  var THANKS = "Thanks! Someone from our team will reach out to learn more about your needs and talk through the right setup for you.";

  var state = fresh();
  var path = null;
  var stepId = "primary";
  var moving = false;
  var timer = 0;
  var open = false;
  var opener = document.getElementById("open-pricing");
  var overlay = document.getElementById("overlay");
  var dialog = overlay.querySelector(".dialog");
  var mount = document.getElementById("step-mount");
  var bar = document.getElementById("bar");
  var progress = document.getElementById("progress");
  var stepLabel = document.getElementById("step-label");

  function fresh() {
    return {
      primaryNeed: "",
      services: [],
      otherServices: "",
      currentSetup: "",
      staffingAgency: "",
      staffingMarkup: "",
      industry: "",
      companySize: "",
      timeline: "",
      serviceType: "",
      jobCategories: [],
      otherJobs: "",
      volume: "",
      stTimeline: "",
      error: "",
      hr: { fullName: "", email: "", phone: "", company: "", role: "", notes: "" },
      st: { fullName: "", email: "", phone: "", company: "", location: "", notes: "" }
    };
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function flow() {
    return path === "staffing" ? ST_FLOW : HR_FLOW;
  }

  function step() {
    return STEPS[stepId] || null;
  }

  function readFields() {
    var nodes = mount.querySelectorAll("[data-field]");
    Array.prototype.forEach.call(nodes, function (el) {
      var key = el.getAttribute("data-field");
      var bucket = el.getAttribute("data-bucket");
      if (bucket) state[bucket][key] = el.value;
      else state[key] = el.value;
    });
  }

  function choiceButton(label, pressed, kind, multi) {
    return '<button type="button" class="choice' + (multi ? " multi" : "") + '" data-kind="' + kind + '" data-choice="' + esc(label) + '" aria-pressed="' + (pressed ? "true" : "false") + '"><span class="mark" aria-hidden="true"></span><span class="label">' + esc(label) + "</span></button>";
  }

  function fieldHtml(field, bucket) {
    var value = bucket ? state[bucket][field.field] : state[field.field];
    var invalid = state.error && field.required && !String(value || "").trim() ? " aria-invalid=\"true\"" : "";
    var common = ' id="f-' + esc(field.field) + '" data-field="' + esc(field.field) + '"' + (bucket ? ' data-bucket="' + bucket + '"' : "") + ' placeholder="' + esc(field.placeholder || "") + '"' + (field.autocomplete ? ' autocomplete="' + esc(field.autocomplete) + '"' : "") + invalid;
    var control = field.textarea
      ? "<textarea" + common + ">" + esc(value || "") + "</textarea>"
      : '<input type="' + (field.type || "text") + '"' + common + ' value="' + esc(value || "") + '">';
    return '<div class="field-block"><label class="field" for="f-' + esc(field.field) + '">' + esc(field.label) + "</label>" + control + "</div>";
  }

  function actionsHtml(current) {
    if (!current) return "";
    var showBack = stepId !== "primary";
    var showNext = current.type === "multi" || current.type === "contact" || !!current.extraWhen;
    var holdNext = !!(current.extraWhen && state[current.field] !== current.extraWhen);
    if (!showBack && !showNext) return "";
    var nextLabel = current.type === "contact" ? "Request Pricing" : "Next";
    return '<div class="actions">' +
      (showBack ? '<button type="button" class="text-btn" data-back>Back</button>' : "<span></span>") +
      (showNext ? '<button type="button" class="btn" data-next' + (holdNext ? " hidden" : "") + ">" + nextLabel + "</button>" : "<span></span>") +
      "</div>";
  }

  function bodyHtml() {
    if (stepId === "done") {
      return '<div class="done"><div class="done-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 12.5l4 4L18 8" fill="none" stroke="#04101f" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div><h2 id="step-title">' + esc(THANKS) + '</h2><button type="button" class="btn" data-close>Close</button></div>';
    }
    var current = step();
    var html = '<h2 id="step-title" tabindex="-1">' + esc(current.title) + "</h2>";
    if (current.help) html += '<p class="help">' + esc(current.help) + "</p>";

    if (current.type === "single" || current.type === "multi") {
      var selected = current.type === "multi" ? state[current.field] : [state[current.field]];
      html += '<div class="choices" role="group" aria-labelledby="step-title">';
      current.options.forEach(function (label) {
        html += choiceButton(label, selected.indexOf(label) !== -1, current.type === "multi" ? "multi" : "single", current.type === "multi");
      });
      html += "</div>";
      if (current.other) {
        var showOther = state[current.field].indexOf("Other") !== -1;
        html += '<div class="optional" id="other-box"' + (showOther ? "" : " hidden") + ">" + fieldHtml(current.other, "") + "</div>";
      }
      if (current.extraWhen) {
        var showExtra = state[current.field] === current.extraWhen;
        html += '<div class="optional" id="extra-box"' + (showExtra ? "" : " hidden") + ">";
        html += '<p class="help">' + esc(current.extraHelp) + "</p>";
        html += '<div class="stack">';
        current.extraFields.forEach(function (field) { html += fieldHtml(field, ""); });
        html += "</div></div>";
      }
    }

    if (current.type === "contact") {
      html += '<div class="stack">';
      if (current.timeline) {
        html += '<div class="field-block"><span class="field">' + esc(current.timeline.label) + '</span><div class="choices timeline" role="group" aria-label="' + esc(current.timeline.label) + '">';
        current.timeline.options.forEach(function (label) {
          html += choiceButton(label, state.timeline === label, "timeline", false);
        });
        html += "</div></div>";
      }
      current.fields.forEach(function (field) { html += fieldHtml(field, current.bucket); });
      html += "</div>";
    }

    if (state.error) html += '<p class="err" role="alert" tabindex="-1">' + esc(state.error) + "</p>";
    html += actionsHtml(current);
    return html;
  }

  function setProgress() {
    var steps = flow();
    var index = stepId === "done" ? steps.length : Math.max(0, steps.indexOf(stepId));
    var pct = stepId === "done" ? 100 : ((index + 1) / steps.length) * 100;
    var now = stepId === "done" ? steps.length : index + 1;
    progress.setAttribute("aria-valuemax", String(steps.length));
    progress.setAttribute("aria-valuenow", String(now));
    if (stepId === "done") {
      stepLabel.textContent = "";
      progress.hidden = false;
    } else {
      stepLabel.textContent = "Step " + (index + 1) + " of " + steps.length;
    }
    window.requestAnimationFrame(function () {
      bar.style.width = pct + "%";
    });
  }

  function render(opts) {
    opts = opts || {};
    mount.innerHTML = bodyHtml();
    mount.classList.remove("step-in", "step-back");
    if (opts.animate) {
      void mount.offsetWidth;
      mount.classList.add(opts.dir === "back" ? "step-back" : "step-in");
    }
    setProgress();
    dialog.scrollTop = 0;
    bindMount();
    var focusEl = null;
    if (state.error) focusEl = mount.querySelector("[aria-invalid='true']") || mount.querySelector(".err");
    if (!focusEl) focusEl = mount.querySelector("#step-title");
    if (focusEl && open) focusEl.focus();
  }

  function bindMount() {
    Array.prototype.forEach.call(mount.querySelectorAll("[data-choice]"), function (btn) {
      btn.addEventListener("click", function () { onChoice(btn); });
    });
    var next = mount.querySelector("[data-next]");
    if (next) next.addEventListener("click", onNext);
    var back = mount.querySelector("[data-back]");
    if (back) back.addEventListener("click", onBack);
    var closeDone = mount.querySelector("[data-close]");
    if (closeDone) closeDone.addEventListener("click", closeModal);
  }

  function clearError() {
    state.error = "";
    var err = mount.querySelector(".err");
    if (err) err.remove();
  }

  function cancelMove() {
    if (timer) window.clearTimeout(timer);
    timer = 0;
    moving = false;
  }

  function advanceSoon() {
    if (moving) return;
    moving = true;
    timer = window.setTimeout(function () {
      timer = 0;
      moving = false;
      go(1);
    }, 260);
  }

  function go(delta) {
    readFields();
    var steps = flow();
    var index = steps.indexOf(stepId);
    var next = steps[index + delta];
    if (!next) return;
    state.error = "";
    stepId = next;
    render({ animate: true, dir: delta < 0 ? "back" : "forward" });
  }

  function onChoice(btn) {
    if (moving) return;
    readFields();
    clearError();
    var kind = btn.getAttribute("data-kind");
    var value = btn.getAttribute("data-choice");
    var current = step();

    if (kind === "multi") {
      var list = state[current.field];
      var at = list.indexOf(value);
      if (at === -1) list.push(value);
      else list.splice(at, 1);
      btn.setAttribute("aria-pressed", list.indexOf(value) === -1 ? "false" : "true");
      var otherBox = document.getElementById("other-box");
      if (otherBox) otherBox.hidden = list.indexOf("Other") === -1;
      return;
    }

    var group = btn.parentElement;
    Array.prototype.forEach.call(group.querySelectorAll(".choice"), function (el) {
      el.setAttribute("aria-pressed", el === btn ? "true" : "false");
    });

    if (kind === "timeline") {
      state.timeline = value;
      return;
    }

    state[current.field] = value;
    if (stepId === "primary") path = value === STAFFING ? "staffing" : "hr";

    if (current.extraWhen) {
      var show = value === current.extraWhen;
      var extra = document.getElementById("extra-box");
      if (extra) extra.hidden = !show;
      var nextBtn = mount.querySelector("[data-next]");
      if (nextBtn) nextBtn.hidden = !show;
      if (show) return;
      state.staffingAgency = "";
      state.staffingMarkup = "";
      if (extra) {
        Array.prototype.forEach.call(extra.querySelectorAll("[data-field]"), function (el) { el.value = ""; });
      }
    }
    advanceSoon();
  }

  function emailOk(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validate() {
    var current = step();
    if (!current) return "";
    if (current.type === "multi") {
      if (!state[current.field].length) return "Please select at least one option.";
      if (current.other && state[current.field].indexOf("Other") !== -1 && !String(state[current.other.field] || "").trim()) {
        return current.other.message;
      }
    }
    if (current.type === "contact") {
      var bag = state[current.bucket];
      if (!bag.fullName.trim() || !bag.email.trim() || !bag.company.trim()) {
        return "Please fill in Name, Email, and Company Name.";
      }
      if (!emailOk(bag.email.trim())) return "Please enter a valid email.";
      if (current.timeline && !state.timeline) return "Please select when you are hoping to get started.";
    }
    return "";
  }

  function finish() {
    readFields();
    var err = validate();
    if (err) {
      state.error = err;
      render({ animate: false });
      return;
    }
    state.error = "";
    stepId = "done";
    render({ animate: true, dir: "forward" });
  }

  function onNext() {
    if (moving) return;
    readFields();
    var current = step();
    if (current && current.other && state[current.field].indexOf("Other") === -1) state[current.other.field] = "";
    if (current && current.type === "contact") {
      finish();
      return;
    }
    var err = validate();
    if (err) {
      state.error = err;
      render({ animate: false });
      return;
    }
    state.error = "";
    go(1);
  }

  function onBack() {
    cancelMove();
    if (stepId === "primary" || stepId === "done") return;
    go(-1);
  }

  function focusables() {
    return Array.prototype.filter.call(dialog.querySelectorAll("button, input, textarea"), function (el) {
      if (el.disabled || el.hidden) return false;
      if (el.closest("[hidden]")) return false;
      return true;
    });
  }

  function openModal() {
    state = fresh();
    path = null;
    stepId = "primary";
    cancelMove();
    open = true;
    document.body.style.overflow = "hidden";
    overlay.setAttribute("aria-hidden", "false");
    bar.style.width = "0%";
    overlay.classList.add("is-open");
    render({ animate: true, dir: "forward" });
  }

  function closeModal() {
    if (!open) return;
    cancelMove();
    open = false;
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    window.setTimeout(function () {
      if (!open) mount.innerHTML = "";
    }, 280);
    if (opener) opener.focus();
  }

  opener.addEventListener("click", openModal);
  document.getElementById("close-pricing").addEventListener("click", closeModal);
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) closeModal();
  });

  document.addEventListener("keydown", function (event) {
    if (!open) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
      return;
    }
    if (event.key === "Enter") {
      var target = event.target;
      if (!target || target.tagName === "TEXTAREA" || target.tagName === "BUTTON") return;
      if (target.tagName === "INPUT") {
        var next = mount.querySelector("[data-next]");
        if (next && !next.hidden) {
          event.preventDefault();
          onNext();
        }
      }
      return;
    }
    if (event.key !== "Tab") return;
    var items = focusables();
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();
