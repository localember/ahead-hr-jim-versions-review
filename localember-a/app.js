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

  var SCHEDULER = "https://www.hrstaff.net/scheduler-demo/";

  var CATEGORIES = [
    "Payroll services",
    "HR support & compliance",
    "Full HR + payroll package",
    "Staffing or recruiting",
    "Workforce tools / HRIS (UKG)",
    "Just exploring options"
  ];

  var AREAS = [
    "Payroll processing & tax filings",
    "Compliance & policy support",
    "Benefits assistance",
    "Employee handbook",
    "Workers’ compensation help",
    "Time & attendance",
    "Recruiting or staffing",
    "HRIS / workforce tools"
  ];

  var HANDLING = [
    "Doing it ourselves (in-house)",
    "Using software only (QuickBooks, etc.)",
    "Handled by an accountant or bookkeeper",
    "Already with a payroll or HR provider",
    "Already using a staffing agency",
    "A mix of the above"
  ];

  var INDUSTRIES = [
    "Manufacturing",
    "Retail",
    "Healthcare",
    "Hospitality",
    "Service",
    "Professional / Legal",
    "Other"
  ];

  var SIZES = [
    "1 – 10 employees",
    "11 – 20 employees",
    "21 – 50 employees",
    "51 – 100 employees",
    "101+ employees"
  ];

  var TIMELINES = [
    "As soon as possible",
    "Within the next 30 days",
    "In the next 1–3 months",
    "Just researching for now"
  ];

  var ORDER = [
    "who",
    "thanks",
    "category",
    "areas",
    "handling",
    "industry",
    "employees",
    "timeline",
    "fullName",
    "company",
    "email",
    "phone",
    "done"
  ];

  var blank = {
    step: "who",
    firstName: "",
    category: "",
    areas: [],
    handling: "",
    industry: "",
    employees: "",
    timeline: "",
    fullName: "",
    company: "",
    email: "",
    phone: "",
    error: ""
  };

  var state = Object.assign({}, blank, { areas: [] });
  var moving = false;
  var app = document.getElementById("app");

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function name() {
    return state.firstName.trim();
  }

  function reset() {
    state = Object.assign({}, blank, { areas: [] });
    moving = false;
    render();
  }

  function go(step) {
    state.step = step;
    state.error = "";
    moving = false;
    render();
  }

  function goSoon(step) {
    if (moving) return;
    moving = true;
    window.setTimeout(function () {
      go(step);
    }, 160);
  }

  function back() {
    var index = ORDER.indexOf(state.step);
    if (index > 0) go(ORDER[index - 1]);
  }

  function choiceButtons(items, selected) {
    return items.map(function (item) {
      var on = item === selected ? " on" : "";
      return '<button type="button" class="choice' + on + '" data-value="' + esc(item) + '"><span>' + esc(item) + "</span></button>";
    }).join("");
  }

  function checkBoxes(items, selected) {
    return items.map(function (item) {
      var on = selected.indexOf(item) !== -1;
      return '<label class="choice' + (on ? " on" : "") + '"><input type="checkbox" value="' + esc(item) + '"' + (on ? " checked" : "") + '><span>' + esc(item) + "</span></label>";
    }).join("");
  }

  function shell(title, helper, body, actions) {
    return (
      '<p class="kicker">Request pricing</p>' +
      "<h1>" + title + "</h1>" +
      (helper ? '<p class="helper">' + helper + "</p>" : "") +
      body +
      (state.error ? '<p class="err" role="alert">' + esc(state.error) + "</p>" : "") +
      '<div class="row-actions">' + actions + "</div>"
    );
  }

  function backButton() {
    if (state.step === "who") return "";
    return '<button type="button" class="linkish" data-back="1">Back</button>';
  }

  function nextButton(label) {
    return '<button type="button" class="btn" data-next="1">' + esc(label) + "</button>";
  }

  function render() {
    var n = esc(name());
    var html = "";

    if (state.step === "who") {
      html = shell(
        "Who am I chatting with?",
        "First name is enough for now.",
        '<label class="field" for="first-name">First name</label><input id="first-name" type="text" autocomplete="given-name" value="' + esc(state.firstName) + '">',
        nextButton("Request pricing")
      );
    } else if (state.step === "thanks") {
      html = shell(
        "Thanks, " + n + ".",
        "A few short questions, then AHEAD can follow up with pricing.",
        "",
        nextButton("Continue") + backButton()
      );
    } else if (state.step === "category") {
      html = shell(
        n + ", what are you primarily looking for?",
        "Pick one.",
        '<div class="choices">' + choiceButtons(CATEGORIES, state.category) + "</div>",
        backButton()
      );
    } else if (state.step === "areas") {
      html = shell(
        n + ", which areas are most important to you?",
        "For " + esc(state.category) + ". Select all that apply.",
        '<div class="choices">' + checkBoxes(AREAS, state.areas) + "</div>",
        nextButton("Next") + backButton()
      );
    } else if (state.step === "handling") {
      html = shell(
        n + ", how are you handling payroll and HR today?",
        "Pick one.",
        '<div class="choices">' + choiceButtons(HANDLING, state.handling) + "</div>",
        backButton()
      );
    } else if (state.step === "industry") {
      html = shell(
        n + ", what industry is your business in?",
        "Pick one.",
        '<div class="choices">' + choiceButtons(INDUSTRIES, state.industry) + "</div>",
        backButton()
      );
    } else if (state.step === "employees") {
      html = shell(
        n + ", how many employees does your company have?",
        "Pick one.",
        '<div class="choices">' + choiceButtons(SIZES, state.employees) + "</div>",
        backButton()
      );
    } else if (state.step === "timeline") {
      var options = '<option value="">Select a timeline</option>' + TIMELINES.map(function (item) {
        return '<option' + (item === state.timeline ? " selected" : "") + ">" + esc(item) + "</option>";
      }).join("");
      html = shell(
        n + ", when are you hoping to get started?",
        "One timeline is enough.",
        '<label class="field" for="timeline">Timeline</label><select id="timeline">' + options + "</select>",
        nextButton("Next") + backButton()
      );
    } else if (state.step === "fullName") {
      html = shell(
        n + ", what's your full name?",
        "So AHEAD knows who to ask for.",
        '<label class="field" for="full-name">Full name</label><input id="full-name" type="text" autocomplete="name" value="' + esc(state.fullName || state.firstName) + '">',
        nextButton("Next") + backButton()
      );
    } else if (state.step === "company") {
      html = shell(
        n + ", what's the company name?",
        "",
        '<label class="field" for="company">Company</label><input id="company" type="text" autocomplete="organization" value="' + esc(state.company) + '">',
        nextButton("Next") + backButton()
      );
    } else if (state.step === "email") {
      html = shell(
        n + ", what's the best email?",
        "",
        '<label class="field" for="email">Email</label><input id="email" type="email" autocomplete="email" inputmode="email" value="' + esc(state.email) + '">',
        nextButton("Next") + backButton()
      );
    } else if (state.step === "phone") {
      html = shell(
        n + ", what's the best phone number?",
        "",
        '<label class="field" for="phone">Phone</label><input id="phone" type="tel" autocomplete="tel" inputmode="tel" value="' + esc(state.phone) + '">',
        nextButton("Next") + backButton()
      );
    } else {
      html =
        '<p class="kicker">Request pricing</p>' +
        "<h1>Thanks, " + n + ". Here's what you told us.</h1>" +
        '<div class="recap"><dl>' +
          row("Chatting with", state.firstName) +
          row("Looking for", state.category) +
          row("Areas", state.areas.join(", ")) +
          row("Handling it now", state.handling) +
          row("Industry", state.industry) +
          row("Employees", state.employees) +
          row("Timeline", state.timeline) +
          row("Name", state.fullName) +
          row("Company", state.company) +
          row("Email", state.email) +
          row("Phone", state.phone) +
        "</dl></div>" +
        '<div class="pricing"><p>Someone from AHEAD will reach out with detailed information and pricing</p>' +
        '<a class="btn" href="' + SCHEDULER + '">Book a time with Jim</a></div>' +
        '<p class="fine">This preview only confirms what you entered. Nothing was sent.</p>' +
        '<div class="row-actions">' + backButton() + "</div>";
    }

    app.innerHTML = html;
    var field = app.querySelector("input[type='text'], input[type='email'], input[type='tel'], select");
    var heading = app.querySelector("h1");
    if (field) field.focus();
    else if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus();
    }
  }

  function row(label, value) {
    return "<div><dt>" + esc(label) + "</dt><dd>" + esc(value || "—") + "</dd></div>";
  }

  function readChecks() {
    var picked = [];
    app.querySelectorAll('input[type="checkbox"]').forEach(function (box) {
      if (box.checked) picked.push(box.value);
    });
    return picked;
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function advance() {
    state.error = "";
    if (state.step === "who") {
      var first = (app.querySelector("#first-name").value || "").trim();
      if (!first) {
        state.error = "Add your first name to continue.";
        state.firstName = "";
        render();
        return;
      }
      state.firstName = first;
      go("thanks");
      return;
    }
    if (state.step === "thanks") {
      go("category");
      return;
    }
    if (state.step === "areas") {
      state.areas = readChecks();
      if (!state.areas.length) {
        state.error = "Select at least one area.";
        render();
        return;
      }
      go("handling");
      return;
    }
    if (state.step === "timeline") {
      var timeline = app.querySelector("#timeline").value;
      if (!timeline) {
        state.error = "Choose a timeline.";
        render();
        return;
      }
      state.timeline = timeline;
      go("fullName");
      return;
    }
    if (state.step === "fullName") {
      var full = (app.querySelector("#full-name").value || "").trim();
      if (!full) {
        state.error = "Add your full name.";
        render();
        return;
      }
      state.fullName = full;
      go("company");
      return;
    }
    if (state.step === "company") {
      var company = (app.querySelector("#company").value || "").trim();
      if (!company) {
        state.error = "Add the company name.";
        render();
        return;
      }
      state.company = company;
      go("email");
      return;
    }
    if (state.step === "email") {
      var email = (app.querySelector("#email").value || "").trim();
      if (!validEmail(email)) {
        state.error = "Enter an email address.";
        state.email = email;
        render();
        return;
      }
      state.email = email;
      go("phone");
      return;
    }
    if (state.step === "phone") {
      var phone = (app.querySelector("#phone").value || "").trim();
      var digits = phone.replace(/\D/g, "");
      if (digits.length < 7) {
        state.error = "Enter a phone number.";
        state.phone = phone;
        render();
        return;
      }
      state.phone = phone;
      go("done");
    }
  }

  app.addEventListener("click", function (event) {
    var backHit = event.target.closest("[data-back]");
    if (backHit) {
      event.preventDefault();
      back();
      return;
    }
    var nextHit = event.target.closest("[data-next]");
    if (nextHit) {
      event.preventDefault();
      advance();
      return;
    }
    var choice = event.target.closest("button.choice");
    if (!choice) return;
    var value = choice.getAttribute("data-value");
    if (state.step === "category") {
      state.category = value;
      choice.classList.add("on");
      goSoon("areas");
    } else if (state.step === "handling") {
      state.handling = value;
      choice.classList.add("on");
      goSoon("industry");
    } else if (state.step === "industry") {
      state.industry = value;
      choice.classList.add("on");
      goSoon("employees");
    } else if (state.step === "employees") {
      state.employees = value;
      choice.classList.add("on");
      goSoon("timeline");
    }
  });

  app.addEventListener("change", function (event) {
    if (event.target.type !== "checkbox") return;
    var label = event.target.closest(".choice");
    if (label) label.classList.toggle("on", event.target.checked);
  });

  app.addEventListener("keydown", function (event) {
    if (event.key !== "Enter") return;
    if (event.target.matches("input")) {
      event.preventDefault();
      advance();
    }
  });

  document.getElementById("start-over").addEventListener("click", reset);
  document.getElementById("brand-home").addEventListener("click", function (event) {
    event.preventDefault();
    reset();
  });

  render();
})();
