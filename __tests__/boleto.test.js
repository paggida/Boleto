const request = require ('supertest')
const app = require('../src/server')

describe("Validation both kinds", () => {
  it("should not be able to send a blank line code", async () => {
    const response = await request(app)
      .get(`/lineCode`);
    expect(response.status).toBe(404);
  });
 it("should not be able to send an incorrect line code size", async () => {
    const wrongSizelineCode = '1234567890';
    const response = await request(app)
      .get(`/lineCode/${wrongSizelineCode}`);
    expect(response.status).toBe(411);
  });
  it("should not be able to send a letter in a line code", async () => {
    const letterSizelineCode = 'A2345678901234567890123456789012345678901234567';
    const response = await request(app)
      .get(`/lineCode/${letterSizelineCode}`);
    expect(response.status).toBe(412);
  });
  it("should not be able to send a special character in a line code", async () => {
    const specialSizelineCode = '+2345678901234567890123456789012345678901234567';
    const response = await request(app)
      .get(`/lineCode/${specialSizelineCode}`);
    expect(response.status).toBe(412);
  });
  it("should not be able to send a reserved character at beginning of line code", async () => {
    const specialSizelineCode = '?2345678901234567890123456789012345678901234567';
    const response = await request(app)
      .get(`/lineCode/${specialSizelineCode}`);
    expect(response.status).toBe(404);
  });
  it("should not be able to send a reserved character at middle of line code", async () => {
    const specialSizelineCode = '1234567890123456789#123456789012345678901234567';
    const response = await request(app)
      .get(`/lineCode/${specialSizelineCode}`);
    expect(response.status).toBe(411);
  });
});

describe("Validation titulo line code", () => {
  it("should not be able to send a titulo line code with incorrect verifying digit", async () => {
    const incorrectVDtitulolineCode = '00190500964014481606006809350315337370000000100';
    const response = await request(app)
      .get(`/lineCode/${incorrectVDtitulolineCode}`);
    expect(response.status).toBe(400);
  });
  it("should be able to send a titulo line code with correct verifying digit", async () => {
    const correctVDtitulolineCode = '00190500954014481606906809350314337370000000100';
    const {body} = await request(app)
      .get(`/lineCode/${correctVDtitulolineCode}`);
    expect(body.validated).toBeTruthy();
  });
  it("should be able to return the value in a titulo line code with this information", async () => {
    const withValueTitulolineCode = '00190500954014481606906809350314337370000000100';
    const {body} = await request(app)
      .get(`/lineCode/${withValueTitulolineCode}`);
    expect(!!body.value).toBeTruthy();
  });
  it("should be able to send a titulo line code without a value information", async () => {
    const notValuetitulolineCode = '00190500954014481606906809350314337370000000000';
    const {body} = await request(app)
      .get(`/lineCode/${notValuetitulolineCode}`);
    expect(body.value).toBeNull();
  });
  it("should be able to return the due date in a titulo line code with this information", async () => {
    const withDueDateTitulolineCode = '00190500954014481606906809350314337370000000100';
    const {body} = await request(app)
      .get(`/lineCode/${withDueDateTitulolineCode}`);
    expect(!!body.dueDate).toBeTruthy();
  });
  it("should be able to send a titulo lineCode without a due date information", async () => {
    const notDueDatetitulolineCode = '00190500954014481606906809350314300000000000100';
    const {body} = await request(app).get(`/lineCode/${notDueDatetitulolineCode}`);
    expect(body.dueDate).toBeNull();
  });
  it("should be able to return the code bar in a titulo line code", async () => {
    const specialSizelineCode = '00190500954014481606906809350314337370000000100';
    const {body} = await request(app)
      .get(`/lineCode/${specialSizelineCode}`);
    expect(body.codeBar).toHaveLength(44);
  });
    // Danilo: títulos com valores maiores que 10 posições
});
// describe("Validation convenio line code", () => {

// });
