#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
#[macro_use] extern crate diesel_migrations;

mod cors;
mod routes;
mod models;
mod db;

use cors::CORS;
use routes::{upload, options, login, options_login};
use db::stage;
use rocket::Rocket;
use rocket::Build;

use crate::db::establish_connection;

#[launch]
fn rocket() -> Rocket<Build> {
    rocket::build()
        .attach(CORS)
        .manage(establish_connection())
        .attach(stage())
        .mount("/", routes![upload, options, login, options_login])
}
