use bollard::{
    secret::{Volume, VolumeListResponse},
    volume::ListVolumesOptions,
    Docker,
};
use tauri::{async_runtime::Mutex, State};

#[tauri::command]
pub async fn get_volumes(state: State<'_, Mutex<Docker>>) -> Result<VolumeListResponse, String> {
    let docker = state.lock().await;

    let options = Some(ListVolumesOptions::<String> {
        ..Default::default()
    });

    docker
        .list_volumes(options)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn inspect_volume(id: String, state: State<'_, Mutex<Docker>>) -> Result<Volume, String> {
    let docker = state.lock().await;

    docker.inspect_volume(&id).await.map_err(|e| e.to_string())
}
