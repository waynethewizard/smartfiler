use diesel::r2d2::{self, ConnectionManager};
use diesel::PgConnection;
use rocket::fairing::AdHoc;
use rocket::Rocket;
use rocket::Build;
use diesel::r2d2::PooledConnection;
use std::env;

pub type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;
pub type DbConn = PooledConnection<ConnectionManager<PgConnection>>;

embed_migrations!("./migrations");

pub fn establish_connection() -> Pool {
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    Pool::new(manager).expect("Failed to create pool.")
}

pub async fn run_migrations(rocket: Rocket<Build>) -> Rocket<Build> {
    let conn = rocket.state::<Pool>().expect("Failed to get DB connection from rocket state").get().unwrap();

    match tokio::task::spawn_blocking(move || embedded_migrations::run_with_output(&conn, &mut std::io::stdout())).await {
        Ok(Ok(_)) => rocket,
        Ok(Err(_)) | Err(_) => {
            println!("Failed to run database migrations");
            panic!("Failed to run database migrations");
        }
    }
}

pub fn stage() -> AdHoc {
    AdHoc::on_ignite("Database Migration", run_migrations)
}
