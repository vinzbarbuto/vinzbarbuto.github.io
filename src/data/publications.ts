export interface Publication {
    id: string;
    title: string;
    authors: string;
    venue: string;
    type: string;
    year: number;
    abstract: string;
    links: {
        url?: string;
        pdf?: string;
        doi?: string;
    };
    image?: string;
    tags: string[];
    bibtex: string;
}

export const publications: Publication[] = [
    {
        id: "fgcs2025",
        title: "Engineering Opportunistic Digital Twins with Lingua Franca",
        authors: "Vincenzo Barbuto, C Savaglio, R Minerva, N Crespi, G Fortino",
        venue: "Future Generation Computer Systems (FGCS)",
        type: "Journal Article",
        year: 2025,
        abstract: "Digital Twins (DTs) are evolving from passive digital shadows into intelligent and adaptive systems empowered by AI. This work focuses on Opportunistic Digital Twins (ODTs), a new class of DTs that dynamically exploit edge-cloud resources. We introduce an engineering approach for building dependable ODTs using Lingua Franca (LF).",
        links: {
            url: "https://www.sciencedirect.com/science/article/pii/S0167739X25005564",
            pdf: "https://www.sciencedirect.com/science/article/pii/S0167739X25005564",
            doi: "https://doi.org/10.1016/j.future.2025.108262"
        },
        image: "https://res.cloudinary.com/dgec2pai8/image/upload/v1774542832/featured_pu3e7i.png",
        tags: ["Digital Twin", "Lingua Franca", "Edge Intelligence"],
        bibtex: `@article{barbuto2025engineering,
  title={Engineering Opportunistic Digital Twins with Lingua Franca},
  author={Barbuto, Vincenzo and Savaglio, Claudio and Minerva, Roberto and Crespi, Noel and Fortino, Giancarlo},
  journal={Future Generation Computer Systems},
  year={2025},
  publisher={Elsevier}
}`
    },
    {
        id: "ipdpsw2025",
        title: "Edge AI in the computing continuum: Consistency and Availability at Early Design Stages",
        authors: "Vincenzo Barbuto, et al.",
        venue: "IPDPS Workshops",
        type: "Conference Paper",
        year: 2025,
        abstract: "This paper integrates Edge Intelligence (EI) with the coordination language Lingua Franca (LF), using the Consistency-Availability-Latency (CAL) theorem to optimize Cyber-Physical Systems (CPS). We demonstrate an Emergency Vehicle Detection (EVD) system that prioritizes emergency vehicles.",
        links: {
            url: "https://ieeexplore.ieee.org/abstract/document/11106087",
            pdf: "https://ieeexplore.ieee.org/abstract/document/11106087",
            doi: "https://doi.org/10.1109/IPDPSW66978.2025.00175"
        },
        image: "https://res.cloudinary.com/dgec2pai8/image/upload/v1774542721/featured_merqbu.png",
        tags: ["Edge AI", "Cyber-Physical Systems", "Lingua Franca"],
        bibtex: `@inproceedings{barbuto2025edge,
  title={Edge AI in the computing continuum: Consistency and Availability at Early Design Stages},
  author={Barbuto, Vincenzo and others},
  booktitle={IEEE International Parallel and Distributed Processing Symposium Workshops (IPDPSW)},
  year={2025},
  organization={IEEE}
}`
    },
    {
        id: "dcoss2025",
        title: "Service Continuity in Healthcare Internet of Things (HIoT): An Architectural Solution",
        authors: "Vincenzo Barbuto, et al.",
        venue: "DCOSS-IoT",
        type: "Conference Paper",
        year: 2025,
        abstract: "An architectural solution for service continuity in Healthcare Internet of Things (HIoT).",
        links: {
            url: "https://ieeexplore.ieee.org/abstract/document/11096185",
            pdf: "https://ieeexplore.ieee.org/abstract/document/11096185",
            doi: "https://doi.org/10.1109/DCOSS-IoT65416.2025.00130"
        },
        image: "https://res.cloudinary.com/dgec2pai8/image/upload/v1774543777/service_njmjra.webp",
        tags: ["IoT", "Healthcare"],
        bibtex: `@inproceedings{barbuto2025service,
  title={Service Continuity in Healthcare Internet of Things (HIoT): An Architectural Solution},
  author={Barbuto, Vincenzo and others},
  booktitle={IEEE International Conference on Distributed Computing in Smart Systems and the Internet of Things (DCOSS-IoT)},
  year={2025},
  organization={IEEE}
}`
    },
    {
        id: "iotm2024",
        title: "Generative Digital Twins: A Novel Approach in the IoT Edge-Cloud Continuum",
        authors: "Vincenzo Barbuto, et al.",
        venue: "IEEE Internet of Things Magazine",
        type: "Journal Article",
        year: 2024,
        abstract: "This paper introduces the concept of Generative Digital Twins (GDTs), an evolution of Digital Twins (DTs) that incorporates Generative AI to enhance prediction, control, optimization, and simulation capabilities in IoT environments, particularly within Smart City scenarios.",
        links: {
            url: "https://ieeexplore.ieee.org/abstract/document/10638534",
            pdf: "https://ieeexplore.ieee.org/abstract/document/10638534",
            doi: "https://doi.org/10.1109/IOTM.001.2400035"
        },
        image: "https://res.cloudinary.com/dgec2pai8/image/upload/v1774542856/featured_aauw1n.png",
        tags: ["Digital Twin", "Generative AI", "Smart City"],
        bibtex: `@article{barbuto2024generative,
  title={Generative Digital Twins: A Novel Approach in the IoT Edge-Cloud Continuum},
  author={Barbuto, Vincenzo and others},
  journal={IEEE Internet of Things Magazine},
  year={2024},
  publisher={IEEE}
}`
    },
    {
        id: "wfiot2024",
        title: "A Generative AI-Driven Architecture for Intelligent Transportation Systems",
        authors: "F Mangione, V Barbuto, C Savaglio, G Fortino",
        venue: "2024 IEEE 10th World Forum on Internet of Things (WF-IoT)",
        type: "Conference Paper",
        year: 2024,
        abstract: "The paper discusses the importance of Digital Twins (DTs) enhanced by AI, Edge Computing, and IoT. It introduces an architecture driven by Generative AI for advanced Intelligent Transportation Systems.",
        links: {
            url: "https://ieeexplore.ieee.org/abstract/document/10811280",
            pdf: "https://ieeexplore.ieee.org/abstract/document/10811280"
        },
        image: "https://res.cloudinary.com/dgec2pai8/image/upload/v1774543773/grid_d6muf6.webp",
        tags: ["Intelligent Transportation Systems", "AI"],
        bibtex: `@inproceedings{mangione2024generative,
  title={A Generative AI-Driven Architecture for Intelligent Transportation Systems},
  author={Mangione, F and Barbuto, Vincenzo and Savaglio, Claudio and Fortino, Giancarlo},
  booktitle={2024 IEEE 10th World Forum on Internet of Things (WF-IoT)},
  year={2024},
  organization={IEEE}
}`
    },
    {
        id: "opportunistic_dt2023",
        title: "Opportunistic Digital Twin: an Edge Intelligence enabler for Smart City",
        authors: "Vincenzo Barbuto, et al.",
        venue: "ACM",
        type: "Journal Article",
        year: 2023,
        abstract: "The paper discusses the importance of Digital Twins (DTs) enhanced by AI, Edge Computing, and IoT. It introduces the concept of 'opportunistic' interpretation of DTs.",
        links: {
            url: "https://dl.acm.org/doi/abs/10.1145/3616014",
            pdf: "https://dl.acm.org/doi/pdf/10.1145/3616014",
            doi: "https://doi.org/10.1145/3616014"
        },
        image: "https://res.cloudinary.com/dgec2pai8/image/upload/v1774542932/featured_epzurb.jpg",
        tags: ["Digital Twin", "Edge Intelligence", "Smart City"],
        bibtex: `@article{barbuto2023opportunistic,
  title={Opportunistic Digital Twin: an Edge Intelligence enabler for Smart City},
  author={Barbuto, Vincenzo and others},
  journal={ACM},
  year={2023},
  publisher={ACM}
}`
    },
    {
        id: "edge_intelligence_survey",
        title: "Disclosing Edge Intelligence: A Systematic Meta-Survey",
        authors: "Vincenzo Barbuto, et al.",
        venue: "MDPI",
        type: "Journal Article",
        year: 2023,
        abstract: "A systematic meta-survey on Edge Intelligence, analyzing current trends, challenges, and future directions.",
        links: {
            url: "https://www.mdpi.com/2504-2289/7/1/44",
            pdf: "https://www.mdpi.com/2504-2289/7/1/44/pdf",
            doi: "https://doi.org/10.3390/bdcc7010044"
        },
        image: "https://res.cloudinary.com/dgec2pai8/image/upload/v1774542766/disclosing_rsyxek.webp",
        tags: ["Edge Intelligence", "Survey"],
        bibtex: `@article{barbuto2023disclosing,
  title={Disclosing Edge Intelligence: A Systematic Meta-Survey},
  author={Barbuto, Vincenzo and others},
  journal={Big Data and Cognitive Computing},
  volume={7},
  number={1},
  pages={44},
  year={2023},
  publisher={MDPI}
}`
    },
    {
        id: "towards_ei_traffic_2023",
        title: "Towards an edge intelligence-based traffic monitoring system",
        authors: "V Barbuto, C Savaglio, R Minerva, N Crespi, G Fortino",
        venue: "2023 IEEE International Conference on Systems, Man, and Cybernetics (SMC)",
        type: "Conference Paper",
        year: 2023,
        abstract: "Traffic monitoring systems are critical for Intelligent Transportation Systems. This paper presents an edge intelligence-based system tailored for autonomous sensing and traffic analysis across the computing continuum.",
        links: {
            url: "https://ieeexplore.ieee.org/abstract/document/10393907/",
            pdf: "https://arxiv.org/pdf/2403.12976",
            doi: "https://doi.org/10.1109/SMC53992.2023.10393907"
        },
        image: "https://res.cloudinary.com/dgec2pai8/image/upload/v1774569361/towards_cgayqj.webp",
        tags: ["Edge Intelligence", "Traffic Monitoring", "Intelligent Transportation Systems"],
        bibtex: `@inproceedings{barbuto2023towards,
  title={Towards an edge intelligence-based traffic monitoring system},
  author={Barbuto, Vincenzo and Savaglio, Claudio and Minerva, Roberto and Crespi, Noel and Fortino, Giancarlo},
  booktitle={2023 IEEE International Conference on Systems, Man, and Cybernetics (SMC)},
  year={2023},
  organization={IEEE}
}`
    }
];
