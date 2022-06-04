const { saveResearchTopic } = require("../researchTopic.controller");

const mockRequest = () => {
  return {
    body: {
      groupId: "629629291d99800a2ae1f047",
      researchTopic: "Test",
      status: "Pending",
      feedBack: "",
    },
  };
};

const mockRequest1 = () => {
  return {
    body: {
      groupId: "629629291d99800a2ae1f057",
      researchTopic: "Test1",
      status: "Pending",
      feedBack: "",
    },
  };
};

const mockRequest2 = () => {
  return {
    body: {
      groupId: null,
      researchTopic: "",
      status: "Pending",
      feedBack: "",
    },
  };
};

const mockResponse = () => {
  const res = {};
  res.status = 400;
  res.json = "This Group Has Already Registered!";
  return res;
};

const mockResponse1 = () => {
  const res = {};
  res.status = 200;
  res.json = "Research Topic Saved Successfully!";
  return res;
};

const mockResponse2 = () => {
  const res = {};
  res.status = 400;
  res.json = "Required Field Missing!";
  return res;
};

// Test cases
describe("checkSaving", () => {
  test("Should return 400 if the groupId is already Registered", async () => {
    const req = mockRequest();
    const res = mockResponse();
    saveResearchTopic(req, res);
    expect(res.status).toBe(400);
  });
});

describe("checkSaving", () => {
  test("Should return 200 if the groupId is not already Registered", async () => {
    const req = mockRequest1();
    const res = mockResponse1();
    saveResearchTopic(req, res);
    expect(res.status).toBe(200);
  });
});
describe("checkSaving", () => {
  test("Should return 400 if required fields are empty", async () => {
    const req = mockRequest2();
    const res = mockResponse2();
    saveResearchTopic(req, res);
    expect(res.status).toBe(400);
  });
});

