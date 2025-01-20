use bollard::{
    image::ListImagesOptions,
    secret::{ImageInspect, ImageSummary},
    Docker,
};
use tauri::{async_runtime::Mutex, State};

#[tauri::command]
pub async fn get_images(state: State<'_, Mutex<Docker>>) -> Result<Vec<ImageSummary>, String> {
    let docker = state.lock().await;

    let list_image_options = ListImagesOptions {
        all: true,
        ..Default::default()
    };

    docker
        .list_images::<String>(Some(list_image_options))
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn inspect_image(
    id: String,
    state: State<'_, Mutex<Docker>>,
) -> Result<ImageInspect, String> {
    let docker = state.lock().await;

    docker.inspect_image(&id).await.map_err(|e| e.to_string())
}
