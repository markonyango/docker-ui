use bollard::image::ListImagesOptions;
use bollard::secret::ImageSummary;
use bollard::Docker;
use tauri::async_runtime::Mutex;
use tauri::State;

mod container;
mod types;


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
pub type AppState = State<'static, Mutex<Docker>>;

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
            get_images,
            container::commands::get_containers,
            container::commands::inspect_container,
            container::commands::start_container,
            container::commands::stop_container,
            container::commands::remove_container,
            container::commands::get_container_stats_once,
            container::commands::get_container_logs_once,
        ])
        .manage(Mutex::new(docker))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
