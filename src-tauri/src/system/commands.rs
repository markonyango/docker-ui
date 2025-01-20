use bollard::{secret::SystemDataUsageResponse, Docker};
use tauri::{async_runtime::Mutex, State};

#[tauri::command]
pub async fn get_system_data_usage(
    state: State<'_, Mutex<Docker>>,
) -> Result<SystemDataUsageResponse, String> {
    let docker = state.lock().await;

    docker.df().await.map_err(|e| e.to_string())
}
