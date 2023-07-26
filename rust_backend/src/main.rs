#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

mod cors;
mod routes;
mod models;

use cors::CORS;
use routes::{upload, options};

use crate::routes::analyze;

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(CORS)
        .mount("/", routes![upload, options, analyze])
}
