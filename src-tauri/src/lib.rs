use bollard::Docker;
use tauri::async_runtime::Mutex;
use tauri::State;

mod container;
mod image;
mod system;
mod types;
mod volume;

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
            image::commands::get_images,
            image::commands::inspect_image,
            container::commands::get_containers,
            container::commands::inspect_container,
            container::commands::start_container,
            container::commands::stop_container,
            container::commands::remove_container,
            container::commands::get_container_stats_once,
            container::commands::get_container_logs_once,
            volume::commands::get_volumes,
            volume::commands::inspect_volume,
            system::commands::get_system_data_usage,
        ])
        .manage(Mutex::new(docker))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
