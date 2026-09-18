export interface Talk {
    id: string;
    title: string;
    event: string;
    date: string;
    description: string;
    image: string;
    imagePosition?: string;
    isLogo?: boolean;
    link?: string;
    slides?: string;
}

export const talks: Talk[] = [
    {
        id: "ieee-digital-twin-2026",
        title: "An Edge-Cloud Digital Twin Platform for Intelligent Smart Park Services",
        event: "The 2026 IEEE International Conference on Digital Twin (IEEE Digital Twin 2026)",
        date: "September 2026",
        description: "Protected natural areas increasingly require intelligent infrastructures to monitor environmental conditions, support visitors, and assist park management while preserving privacy and operating under limited connectivity. Addressing these challenges requires integrated architectures that combine distributed sensing, edge intelligence, cloud services, and Digital Twin (DT) technologies. This work presents a Smart Park platform developed for the \"I Giganti della Sila\" State Reserve in the Sila National Park, Calabria, Italy. The platform adopts a layered edge-cloud architecture organized around a closed operational loop that acquires environmental and visitor data, processes them through distributed intelligence, and delivers actionable services to visitors and park operators. A territorial DT federates multiple sensing and analytics subsystems into a unified, real-time representation of the park.",
        image: "https://res.cloudinary.com/dgec2pai8/image/upload/v1789139318/presentation_IEEE_Digital_Twin_yrktlo.webp",
        imagePosition: "left",
        isLogo: false,
        link: "https://swc-ieee-2026.github.io/digitaltwin/"
    },
    {
        id: "swc-dt-tutorial-2026",
        title: "Digital Twin Engineering: Architectures, AI Techniques, and the TopDown/BottomUp Lifecycle of Behavior Model Construction",
        event: "Tutorial @ 2026 IEEE Smart World Congress (IEEE SWC 2026)",
        date: "September 2026",
        description: "Tutorial co-presented with Dr. Roberto Minerva exploring the software-oriented foundations of Digital Twin engineering. It examines how architectural choices, AI techniques (Deep Learning, Generative AI, and Reinforcement Learning in the loop), and top-down/bottom-up methodologies shape viable behavior models across the entire lifecycle of a Twin.",
        image: "https://res.cloudinary.com/dgec2pai8/image/upload/v1789139318/tutorial_nijlxi.webp",
        imagePosition: "center 62%",
        isLogo: false,
        link: "https://swc-ieee-2026.github.io/tutorials/digital-twin/",
        slides: "https://drive.google.com/file/d/17JBix0wWC5TQ1sD-wOnUK3eQf3hp36FK/view?usp=drive_link"
    },
    {
        id: "ieee-metrolivenv-2026",
        title: "Wearable Monitoring for Early Cardiotoxicity Detection in Cancer Patients: The COMPASS Vision",
        event: "2026 IEEE International Workshop on Metrology for Living Environment - IEEE MetroLivEnv 2026",
        date: "July 2026",
        description: "The talk examined the role of continuous wearable monitoring in the early detection of cancer therapy-related cardiovascular toxicity. It reviewed the main wearable sensing modalities for cardiovascular biomarkers, ECG, PPG, blood pressure estimation, heart rate variability, and IMU-derived functional capacity, together with their clinical relevance and metrological limitations, and introduced the research vision of the COMPASS project, an EU-funded initiative integrating wearable-derived data into AI-based clinical decision support for personalized cardio-oncology care.",
        image: "https://res.cloudinary.com/dgec2pai8/image/upload/v1784727244/IMG_0094_cumhf6.webp",
        isLogo: false,
        link: "https://www.metrolivenv.org/"
    },
    {
        id: "urbsense-2026",
        title: "Enhancing Intelligent Transportation Systems with Optimal Cloud-to-Things Resource Allocation",
        event: "URBSENSE 2026 - Urban Intelligence for Safer Cities",
        date: "2026",
        description: "Presentation of my latest work extending Intelligent Transportation Systems by optimally allocating computing resources across the Cloud-to-Things continuum.",
        image: "https://res.cloudinary.com/dgec2pai8/image/upload/v1774541068/urbsense_ilxkwn.webp",
        isLogo: false,
        link: "https://www.urbsense.org/"
    },
    {
        id: "ieee-smc-2026",
        title: "Engineering Opportunistic Digital Twins with Lingua Franca",
        event: "Lecture Series 2026 - IEEE SMC Italy Chapter",
        date: "February 2026",
        description: "Talk presenting my latest work on engineering Opportunistic Digital Twins using Lingua Franca. The presentation shows how deterministic coordination and explicit timing semantics can support reliable, AI-enabled digital twins that opportunistically leverage edge-cloud resources, illustrated through a Smart Traffic Management case study for Emergency Vehicle Preemption.",
        image: "https://res.cloudinary.com/dgec2pai8/image/upload/v1774537857/smc_z4h9vb.webp",
        isLogo: true,
        link: "https://r8.ieee.org/italy-smc/2026/02/23/first-lecture-of-the-series-2026/"
    },
    {
        id: "paise-2025",
        title: "Edge AI in the computing continuum - Consistency and Availability at Early Design Stages",
        event: "7th Workshop on Parallel AI and Systems for the Edge (PAISE)",
        date: "June 2025",
        description: "Talk presenting my latest work about Edge AI in the computing continuum and the trade-offs between consistency and availability. Discusses the early design stage implications of prioritizing low-latency inference on the edge versus available cloud assistance.",
        image: "https://res.cloudinary.com/dgec2pai8/image/upload/v1774537871/ipdps_zrexza.webp",
        isLogo: false,
        link: "https://paise.org/2025"
    },
    {
        id: "webinar-2024",
        title: "Digital Twins in Action: From IoT Continuum to UAV Control Theory.",
        event: "Webinar - IEEE University of Calabria Student Branch",
        date: "September 2024",
        description: "Online webinar co-presented with Dr. Ghulam E. Mustafa Abro on the application of Digital Twins across UAV systems and the IoT edge\u2013cloud continuum. I presented my work on Generative Digital Twins and their role in the IoT Edge-Cloud Continuum, highlighting how Generative AI can support the development of adaptive Digital Twins. Dr. Abro then discussed UAV control theory and the role of Digital Twins in UAV systems.",
        image: "https://res.cloudinary.com/dgec2pai8/image/upload/v1774537873/webinar_cvb6oj.webp",
        isLogo: false,
        link: "https://edu.ieee.org/it-uc/"
    }
    // Data ready to be easily appended. Add new talks here in the future
];

