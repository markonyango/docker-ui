use bollard::{
    container::{ListContainersOptions, LogOutput, LogsOptions, Stats, StatsOptions},
    secret::ContainerInspectResponse,
    Docker,
};
use futures::StreamExt;
use serde::Serialize;
use tauri::{async_runtime::Mutex, State};

use crate::{types::ContainerInformation, AppState};

#[tauri::command]
pub async fn get_containers(
    state: State<'_, Mutex<Docker>>,
) -> Result<Vec<ContainerInformation>, String> {
    let docker = state.lock().await;

    let list_container_options = ListContainersOptions {
        all: true,
        ..Default::default()
    };

    let containers = docker
        .list_containers::<String>(Some(list_container_options))
        .await
        .map_err(|e| e.to_string())?
        .into_iter()
        .map(Into::into)
        .collect();

    Ok(containers)
}

#[tauri::command]
pub async fn inspect_container(
    id: String,
    state: State<'_, Mutex<Docker>>,
) -> Result<ContainerInspectResponse, String> {
    let docker = state.lock().await;

    let container_details = docker
        .inspect_container(&id, None)
        .await
        .map_err(|e| e.to_string())?;

    Ok(container_details)
}

#[tauri::command]
pub async fn stop_container(id: String, state: State<'_, Mutex<Docker>>) -> Result<(), String> {
    let docker = state.lock().await;

    docker
        .stop_container(&id, None)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn start_container(id: String, state: State<'_, Mutex<Docker>>) -> Result<(), String> {
    let docker = state.lock().await;

    docker
        .start_container::<String>(&id, None)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn remove_container(id: String, state: State<'_, Mutex<Docker>>) -> Result<(), String> {
    let docker = state.lock().await;

    docker
        .remove_container(&id, None)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_container_stats_once(
    id: String,
    state: State<'_, Mutex<Docker>>,
) -> Result<Stats, String> {
    let docker = state.lock().await;

    let options = StatsOptions {
        stream: false,
        one_shot: false,
    };
    docker
        .stats(&id, Some(options))
        .next()
        .await
        .unwrap()
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_container_logs_once(
    id: String,
    state: State<'_, Mutex<Docker>>,
) -> Result<Vec<LogMessage>, String> {
    let docker = state.lock().await;

    let options = Some(LogsOptions::<String> {
        follow: false,
        stdout: true,
        stderr: true,
        tail: "all".into(),
        timestamps: true,
        since: 0,
        until: 0,
    });

    let mut messages = Vec::new();
    let mut call = docker.logs(&id, options.clone());

    while let Some(message) = call.next().await {
        messages.push(message);
    }

    let messages = messages
        .into_iter()
        .filter_map(|message| message.ok())
        .map(Into::into)
        .collect();

    Ok(messages)
}

#[derive(Debug, Clone, Serialize)]
pub struct LogMessage {
    pub message: String,
    pub source: String,
    pub timestamp: Option<String>,
}

impl From<LogOutput> for LogMessage {
    fn from(value: LogOutput) -> Self {
        match value {
            LogOutput::StdErr { message } => Self {
                message: String::from_utf8_lossy(&message).into(),
                source: "stderr".into(),
                timestamp: extract_timestamp_from_byte_message(&message),
            },
            LogOutput::StdOut { message } => Self {
                message: String::from_utf8_lossy(&message).into(),
                source: "stdout".into(),
                timestamp: extract_timestamp_from_byte_message(&message),
            },
            LogOutput::StdIn { message } => Self {
                message: String::from_utf8_lossy(&message).into(),
                source: "stdin".into(),
                timestamp: extract_timestamp_from_byte_message(&message),
            },
            LogOutput::Console { message } => Self {
                message: String::from_utf8_lossy(&message).into(),
                source: "console".into(),
                timestamp: extract_timestamp_from_byte_message(&message),
            },
        }
    }
}

fn extract_timestamp_from_byte_message(message: &[u8]) -> Option<String> {
    String::from_utf8_lossy(message)
        .split_once(" ")
        .map(|(timestamp, _message)| timestamp.into())
}
