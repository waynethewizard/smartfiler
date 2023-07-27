use rocket::Data;
use rocket::response::status::Custom;
use rocket::serde::json::Json;
use rocket::data::ByteUnit;
use tokio::io::AsyncReadExt;
use std::collections::HashMap;

use crate::models::ChatGPTResponse;
use crate::models::LoginRequest;

// User information
#[post("/login", format = "json", data = "<login_request>")]
pub fn login(login_request: Json<LoginRequest>) -> &'static str {
    println!("Username: {}", login_request.username);
    println!("Password: {}", login_request.password);
    "Logged in"
}

#[options("/login")]
pub fn options_login() -> CORS<&'static str> {
    CORS("")
}

// File uploading
#[post("/", data = "<data>")]
pub async fn upload(data: Data<'_>) -> Result<Json<Vec<HashMap<String, String>>>, Custom<String>> {
    // Read the data into a Vec<u8>
    let mut raw_data = Vec::new();
    if let Err(_) = data.open(ByteUnit::Megabyte(1)).read_to_end(&mut raw_data).await {
        return Err(Custom(Status::InternalServerError, "Failed to read data".into()));
    }

    // Convert raw data to a string
    let raw_data = String::from_utf8(raw_data).map_err(|_| Custom(Status::BadRequest, "Invalid UTF-8".into()))?;

    // Parse CSV data
    let mut reader = csv::ReaderBuilder::new().from_reader(raw_data.as_bytes());

    let mut records = Vec::new();
    for result in reader.deserialize() {
        let record: HashMap<String, String> = result.map_err(|err| Custom(Status::BadRequest, format!("Invalid CSV: {}", err)))?;
        records.push(record);
    }

    // Print the first 5 records
    for record in records.iter().take(5) {
        println!("Record: {:?}", record);
    }

    Ok(Json(records))
}


// ChatGPT Responses
fn map_to_chatgpt_prompt(records: Vec<HashMap<String, String>>) -> String {
    // create the prompt string here
    "".to_string()
}

#[post("/analyze", format = "json", data = "<records>")]
pub async fn analyze(records: Json<Vec<HashMap<String, String>>>) -> Result<Json<ChatGPTResponse>, Status> {
    let client = reqwest::Client::new();

    let res = client.post("https://api.openai.com/v1/engines/davinci-codex/completions")
        .header("Authorization", "Bearer your_openai_api_key_here")
        .json(&map_to_chatgpt_prompt(records.0))
        .send()
        .await.map_err(|_| Status::InternalServerError)?;

    let chatgpt_response: Result<ChatGPTResponse, _> = res.json().await;
    let chatgpt_response = chatgpt_response.map_err(|_| Status::InternalServerError)?;

    Ok(Json(chatgpt_response))
}


// Other
#[options("/")]
pub fn options() -> &'static str {
    ""
}

use rocket::response::{self, Responder, Response};
use rocket::http::Status;
use rocket::Request;
use rocket::http::Header;

pub struct CORS<R>(pub R);

#[rocket::async_trait]
impl<'r, R: Responder<'r, 'static>> Responder<'r, 'static> for CORS<R> {
    fn respond_to(self, req: &'r Request<'_>) -> response::Result<'static> {
        let mut res = Response::build();

        res.merge(self.0.respond_to(req)?);
        res.header(Header::new("Access-Control-Allow-Origin", "*"));
        res.header(Header::new("Access-Control-Allow-Methods", "POST, GET, PATCH, OPTIONS"));
        res.header(Header::new("Access-Control-Allow-Headers", "*"));
        res.header(Header::new("Access-Control-Allow-Credentials", "true"));
        
        res.ok()
    }
}