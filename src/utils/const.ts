// ホットペッパーAPIを叩くためのURL
export const HOTPEPPER_URL = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.API_KEY}&format=json&lat=35.689445&lng=139.70735&range=3&count=50`;

// JavaのAPIを叩くためのURLの共通部分
export const JAVA_API_URL = "http://localhost:8080";