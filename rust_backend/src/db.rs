// db.rs
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};

type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;


pub type DbConn = r2d2::PooledConnection<ConnectionManager<PgConnection>>;

let conn = rocket.state::<DbConn>().unwrap();


pub fn establish_connection() -> Pool {
    dotenv::dotenv().ok();

    let database_url = std::env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.")
}
