use bollard::{secret::ContainerInspectResponse, Docker};
use tauri::{async_runtime::Mutex, State};

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
