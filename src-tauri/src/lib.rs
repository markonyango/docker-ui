use bollard::container::ListContainersOptions;
use bollard::image::ListImagesOptions;
use bollard::secret::ImageSummary;
use bollard::Docker;
use tauri::async_runtime::Mutex;
use tauri::State;
use types::ContainerInformation;

mod container;
mod types;

#[tauri::command]
async fn get_containers(
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
async fn get_images(state: State<'_, Mutex<Docker>>) -> Result<Vec<ImageSummary>, String> {
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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    env_logger::init();
    let docker = match Docker::connect_with_local_defaults() {
        Ok(docker) => docker,
        Err(e) => panic!("{:?}", e.to_string()),
    };

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_containers,
            get_images,
            container::commands::inspect_container,
            container::commands::start_container,
            container::commands::stop_container,
            container::commands::remove_container
        ])
        .manage(Mutex::new(docker))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
