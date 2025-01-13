use std::{collections::HashMap, vec::IntoIter};

use bollard::secret::ContainerSummary;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Default, PartialEq, Serialize, Deserialize)]
pub struct ContainerInformation {
    /// The ID of this container
    pub id: Option<String>,

    /// The names that this container has been given
    pub names: Option<Vec<String>>,

    /// The name of the image used when creating this container
    pub image: Option<String>,

    /// The ID of the image that this container was created from
    pub image_id: Option<String>,

    /// Command to run when starting the container
    pub command: Option<String>,

    /// When the container was created
    pub created: Option<i64>,

    /// The ports exposed by this container
    pub ports: Option<Vec<Port>>,

    /// The size of files that have been created or changed by this container
    pub size_rw: Option<i64>,

    /// The total size of all the files in this container
    pub size_root_fs: Option<i64>,

    /// User-defined key/value metadata.
    pub labels: Option<HashMap<String, String>>,

    /// The state of this container (e.g. `Exited`)
    pub state: Option<String>,

    /// Additional human-readable status of this container (e.g. `Exit 0`)
    pub status: Option<String>,
    // pub host_config: Option<ContainerSummaryHostConfig>,

    // pub network_settings: Option<ContainerSummaryNetworkSettings>,

    // pub mounts: Option<Vec<MountPoint>>,
    pub cpu_usage: Option<usize>,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize, PartialEq)]
pub struct Port {
    pub ip: Option<String>,
    pub private_port: u16,
    pub public_port: Option<u16>,
    pub typ: Option<String>,
}

impl From<ContainerSummary> for ContainerInformation {
    fn from(value: ContainerSummary) -> Self {
        Self {
            id: value.id,
            names: value.names,
            image: value.image,
            image_id: value.image_id,
            command: value.command,
            created: value.created,
            ports: from_ports(value.ports),
            size_rw: value.size_rw,
            size_root_fs: value.size_root_fs,
            labels: value.labels,
            state: value.state,
            status: value.status,
            cpu_usage: None,
        }
    }
}

impl From<bollard::secret::Port> for Port {
    fn from(value: bollard::secret::Port) -> Self {
        Self {
            ip: value.ip,
            private_port: value.private_port,
            public_port: value.public_port,
            typ: match value.typ {
                Some(t) => match t {
                    bollard::secret::PortTypeEnum::EMPTY => Some("".to_string()),
                    bollard::secret::PortTypeEnum::TCP => Some("tcp".to_string()),
                    bollard::secret::PortTypeEnum::UDP => Some("udp".to_string()),
                    bollard::secret::PortTypeEnum::SCTP => Some("sctp".to_string()),
                },
                None => None,
            },
        }
    }
}

fn from_ports<I>(ports: Option<I>) -> Option<Vec<Port>>
where
    I: IntoIterator<Item = bollard::secret::Port>,
{
    match ports {
        Some(ports) => Some(ports.into_iter().map(|port| port.into()).collect()),
        None => None,
    }
}
