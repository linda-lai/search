const Ticket = require("../../src/ticket");
const User = require("../../src/user");
const Organization = require("../../src/organization");

const testOrganization = [
  new Organization({
    _id: 114,
    url: "http://initech.zendesk.com/api/v2/organizations/114.json",
    external_id: "49c97d6a-f1ec-422e-aabe-8a429e81e656",
    name: "Isotronic",
    domain_names: ["gynk.com", "goko.com", "zilidium.com", "accruex.com"],
    created_at: "2016-05-24T04:27:35 -10:00",
    details: "Artisân", // special character
    shared_tickets: true,
    tags: ["Burton", "Dunn", "Morton", "Maddox"], // array matching
  }),
];

const testUser = [
  new User({
    _id: 59,
    url: "http://initech.zendesk.com/api/v2/users/59.json", //string
    external_id: "4acd4eb0-9168-4270-b09f-09600a05b0b2",
    name: "Key Mendez",
    alias: "Mr Lucile",
    created_at: "2016-04-23T12:00:11 -10:00", // date
    active: false, // boolean
    verified: false,
    shared: false,
    locale: "zh-CN",
    timezone: "Nigeria",
    last_login_at: "2014-06-03T02:26:28 -10:00",
    email: "lucilemendez@flotonic.com",
    phone: "8774-883-991",
    signature: "Don't Worry Be Happy!",
    organization_id: 118, // number
    tags: ["Rockingham", "Waikele", "Masthope", "Oceola"],
    suspended: false,
    role: "agent",
  }),
];

const testTicket = [
  new Ticket({
    _id: "436bf9b0-1147-4c0a-8439-6f79833bff5b",
    url: "http://initech.zendesk.com/api/v2/tickets/436bf9b0-1147-4c0a-8439-6f79833bff5b.json",
    external_id: "9210cdc9-4bee-485f-a078-35396cd74063",
    created_at: "2016-04-28T11:19:34 -10:00",
    type: "incident",
    subject: "", // empty ""
    description: null, // null
    priority: "high",
    status: "pending",
    // undefined assignee_id: 24
    submitter_id: 38,
    organization_id: 116,
    tags: [
      "Ohio",
      "Pennsylvania",
      "American Samoa",
      "Northern Mariana Islands",
    ],
    has_incidents: false,
    due_at: "2016-07-31T02:37:50 -10:00",
    via: "web",
  }),
];

module.exports = { testOrganization, testUser, testTicket };
