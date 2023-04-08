// testleri buraya yazın
const db=require("../data/dbConfig");
const server=require("./server");
const superTest=require("supertest");

beforeAll(async()=>{
  await db.migrate.rollback();
  await db.migrate.latest();
});


test('[0] Testler çalışır durumda]', () => {
  expect(true).toBe(true)
});


describe("Register tests", ()=>{
  it("[1] register payload dolu ve başarılı sonuç/", async ()=>{
    const res=await superTest(server).post("/api/auth/register").send({ username: 'testuser', password: 'password123' })
    expect(res.status).toEqual(201);
    expect(res.body.id).toBeGreaterThan(0);

    //expect(login.status).toEqual(200);
  })

  it("[2] register payload boş ve başarısız sonuç /", async ()=>{
    const res=await superTest(server).post("/api/auth/register").send({ username: 'testuser', password: 'password123' })
    expect(res.status).toEqual(422);
    expect(res.body.message).toBe("kullanıcı adını veya parolayı kontrol et");

    //expect(login.status).toEqual(200);
  })
});

describe("Login Test", ()=>{
  it("[3] login endpoint is working /", async ()=>{
    const res=await superTest(server).post("/api/auth/login").send({ username: 'testuser', password: 'password123' })
    expect(res.status).toBe(200);
    expect(res.body.token).not.toBe(null)
  })
}); 

describe("Bilmeceler tokensız açılmaz", ()=>{
  it("[4] Token gereklidir/", async ()=>{
    const res=await superTest(server).get("/api/bilmeceler")
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Token gereklidir")
  })
}); 