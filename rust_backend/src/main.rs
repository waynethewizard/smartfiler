// main.rs
#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

mod cors;
mod routes;
mod models;
mod db;

use cors::CORS;
use routes::{upload, options, login, options_login};
use db::establish_connection;
use rocket::fairing::AdHoc;
use rocket::Rocket;
use rocket::Build;
use rocket::fairing;

use crate::db::DbConn;


#[macro_use]
extern crate diesel_migrations;

embed_migrations!("./migrations");


async fn run_migrations(rocket: Rocket<Build>) -> Result<Rocket<Build>, Rocket<Build>> {
    let conn = DbConn::get_one(&rocket).await.expect("database connection");

    // This line embeds migrations into the binary
    embed_migrations!();
    
    let result = match embedded_migrations::run(&*conn) {
        Ok(()) => Ok(rocket),
        Err(e) => {
            error!("Failed to run database migrations: {:?}", e);
            Err(rocket)
        }
    };

    result
}



#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(CORS)
        .attach(AdHoc::on_ignite("Database Migrations", run_migrations))
        .manage(establish_connection())
        .mount("/", routes![upload, options, login, options_login])
}
