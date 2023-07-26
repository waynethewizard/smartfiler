use serde::{Deserialize, Serialize};

// User information
#[derive(serde::Deserialize)]
pub struct LoginRequest {
    pub username: String,
    pub password: String,
}

// ChatGPT Responses
#[derive(Debug, Deserialize, Serialize)]
pub struct ChatGPTResponse {
    id: String,
    object: String,
    created: i64,
    model: String,
    usage: Usage,
    choices: Vec<Choice>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Usage {
    prompt_tokens: i32,
    completion_tokens: i32,
    total_tokens: i32,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Choice {
    message: Message,
    finish_reason: String,
    index: i32,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Message {
    role: String,
    content: String,
}
