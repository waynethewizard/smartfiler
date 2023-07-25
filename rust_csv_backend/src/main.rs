#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

use std::collections::HashMap;
use std::io::Read;

use rocket::Data;
use rocket::http::Status;
use rocket::response::status::Custom;
use rocket::serde::json::Json;
use rocket::data::ByteUnit;
use tokio::io::AsyncReadExt;

use rocket_multipart_form_data::{MultipartFormDataOptions, MultipartFormData, MultipartFormDataField};

#[post("/", data = "<data>")]
async fn upload(mut data: Data<'_>) -> Result<Json<Vec<HashMap<String, String>>>, Custom<String>> {
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


use rocket::http::Header;
use rocket::{Request, Response};
use rocket::fairing::{Fairing, Info, Kind};

pub struct CORS;

#[rocket::async_trait]
impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to responses",
            kind: Kind::Response
        }
    }

    async fn on_response<'r>(&self, _request: &'r Request<'_>, response: &mut Response<'r>) {
        response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(Header::new("Access-Control-Allow-Methods", "POST, GET, PATCH, OPTIONS"));
        response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
    }
}

#[options("/")]
fn options() -> &'static str {
    ""
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(CORS)
        .mount("/", routes![upload, options])
}