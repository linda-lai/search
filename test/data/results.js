// const Ticket = require("../../ticket");
const User = require("../../user");
const Organization = require("../../organization");

let mockOrganization = [
  new Organization({
    _id: 101,
    url: "http://initech.zendesk.com/api/v2/organizations/101.json",
    external_id: "9270ed79-35eb-4a38-a46f-35725197ea8d",
    name: "Enthaze",
    domain_names: ["kage.com", "ecratic.com", "endipin.com", "zentix.com"],
    created_at: "2016-05-21T11:10:28 -10:00",
    details: "MegaCorp",
    shared_tickets: false,
    tags: ["Fulton", "West", "Rodriguez", "Farley"],
  }),
];

let mockUsers = [
  {
    _id: 49,
    url: "http://initech.zendesk.com/api/v2/users/49.json",
    external_id: "4bd5e757-c0cd-445b-b702-ee3ed794f6c4",
    name: "Faulkner Holcomb",
    alias: "Miss Jody",
    created_at: "2016-05-12T08:39:30 -10:00",
    active: true,
    verified: false,
    shared: true,
    locale: "zh-CN",
    timezone: "Antigua and Barbuda",
    last_login_at: "2014-12-04T12:51:36 -11:00",
    email: "jodyholcomb@flotonic.com",
    phone: "9255-943-719",
    signature: "Don't Worry Be Happy!",
    organization_id: 118,
    tags: ["Hanover", "Woodlake", "Saticoy", "Hinsdale"],
    suspended: true,
    role: "end-user",
  },
  {
    _id: 59,
    url: "http://initech.zendesk.com/api/v2/users/59.json",
    external_id: "4acd4eb0-9168-4270-b09f-09600a05b0b2",
    name: "Key Mendez",
    alias: "Mr Lucile",
    created_at: "2016-04-23T12:00:11 -10:00",
    active: false,
    verified: false,
    shared: false,
    locale: "zh-CN",
    timezone: "Nigeria",
    last_login_at: "2014-06-03T02:26:28 -10:00",
    email: "lucilemendez@flotonic.com",
    phone: "8774-883-991",
    signature: "Don't Worry Be Happy!",
    organization_id: 119,
    tags: ["Rockingham", "Waikele", "Masthope", "Oceola"],
    suspended: false,
    role: "agent",
  },
].map((record) => new User(record));

module.exports = { mockOrganization, mockUsers };
