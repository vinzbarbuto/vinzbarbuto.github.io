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
        id: "percom2026",
        title: "Enhancing Intelligent Transportation Systems with Optimal Cloud-to-Things Resource Allocation",
        authors: "V Barbuto, M Pettorali, F Righetti, C Savaglio, G Anastasi, G Fortino",
        venue: "2026 IEEE International Conference on Pervasive Computing and Communications Workshops and other Affiliated Events",
        type: "Conference Paper",
        year: 2026,
        abstract: "Urban sensing for Intelligent Transportation Systems (ITS) increasingly relies on the Cloud-to-Things Continuum (C2TC), to balance latency, reliability, and computational demand. Systems based solely on cloud platforms can no longer guarantee these requirements, especially as the number of sensors and monitoring devices continues to grow, increasing the overall data exchange. By deploying edge Artificial Intelligence (edge-AI) models for vehicle detection and counting at the network edge, intersections can adapt signal plans locally, reducing reaction times and data traffic. In this paper, we tackle the problem of optimal task placement in the C2TC to meet the temporal requirements of edge-AI–based ITS. We propose a workflow that integrates J-NECORA, an analytical framework that computes optimal resource allocation under Quality of Service (QoS) constraints, with the EdgeCloudSim simulator, to assess additional Key performance indicators (KPIs) such as network time, node utilization and missed deadlines. The workflow is evaluated in an urban traffic scenario, and results show that it provides deeper and broader insights compared to a purely analytical approach, confirming the effectiveness of the proposed approach for designing time-critical, edge-enabled ITS.",
        links: {
            url: "https://ieeexplore.ieee.org/abstract/document/11585187",
            doi: "https://doi.org/10.1109/PerComWorkshops68308.2026.11585187"
        },
        image: "https://res.cloudinary.com/dgec2pai8/image/upload/v1783604547/allocation_b0v3s0.webp",
        tags: ["Edge AI", "Intelligent Transportation Systems", "Resource Allocation"],
        bibtex: `@inproceedings{barbuto2026enhancing,
  title={Enhancing Intelligent Transportation Systems with Optimal Cloud-to-Things Resource Allocation},
  author={Barbuto, Vincenzo and Pettorali, Marco and Righetti, Francesca and Savaglio, Claudio and Anastasi, Giuseppe and Fortino, Giancarlo},
  booktitle={2026 IEEE International Conference on Pervasive Computing and Communications Workshops and other Affiliated Events (PerCom Workshops)},
  pages={1--6},
  year={2026},
  organization={IEEE}
}`
    },
    {
        id: "fgcs2025",
        title: "Engineering Opportunistic Digital Twins with Lingua Franca",
        authors: "V Barbuto, C Savaglio, EA Lee, G Fortino",
        venue: "Future Generation Computer Systems (FGCS)",
        type: "Journal Article",
        year: 2025,
        abstract: "Digital Twins (DTs) have emerged as essential tools for virtualizing and enhancing Cyber-Physical Systems (CPS) by providing synchronized digital counterparts that enable monitoring, control, prediction, and optimization. Initially conceived as passive digital shadows, DTs are increasingly evolving into intelligent and proactive entities, enabled by the integration of Artificial Intelligence (AI). Among these advancements, Opportunistic Digital Twins (ODTs) represent a novel class of DTs: living, AI-aided, and actionable models that opportunistically exploit edge-cloud resources to deliver enriched and adaptive representations of physical entities and processes. However, despite their promise, current research lacks systematic engineering methods to ensure reliable coordination, determinism, and real-time responsiveness of ODTs in distributed and resource-constrained CPS. This article addresses this gap by introducing an engineering approach to build dependable and efficient ODTs by leveraging the deterministic concurrency, explicit timing semantics, and disciplined event handling of Lingua Franca (LF). The approach is exemplified through a Smart Traffic Management case study centered on Emergency Vehicle Preemption (EVP), where the ODT dynamically selects AI models based on runtime conditions while ensuring deterministic coordination across distributed nodes. Experimental results confirm the feasibility and effectiveness of our methodology, underscoring the potential of LF-based ODT engineering to enhance reliability, adaptability, and scalability in intelligent and distributed CPS deployments.",
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
        authors: "V Barbuto, C Savaglio, G Fortino, EA Lee",
        venue: "IPDPS Workshops",
        type: "Conference Paper",
        year: 2025,
        abstract: "This paper explores the integration of Edge Intelligence (EI) with the coordination language LINGUA FRANCA (LF), leveraging the Consistency-Availability-Latency (CAL) theorem as the theoretical foundation to optimize Cyber-Physical Systems (CPS) design and deployment. We propose a distributed EI-based approach for CPS to develop an Emergency Vehicle Detection (EVD) system that dynamically adjusts traffic signals at intersections to prioritize emergency vehicles, improving emergency response times while maintaining traffic efficiency. The system employs multimodal detection techniques, including audio classification and object detection, and utilizes LF’s deterministic coordination to ensure seamless execution across the computing continuum. We analyze two deployment scenarios: cloud-assisted and fully edge-based. The CAL theorem guides tradeoffs between consistency, availability, and latency, informing optimal service placement at design time. Experimental results validate the theoretical analysis, showing that the edge-based deployment achieves 2.8x lower inference-to-actuation latency and 10.26% lower energy consumption compared to the cloud-assisted scenario, while also eliminating bandwidth overhead associated with data transmission to the cloud.",
        links: {
            url: "https://ieeexplore.ieee.org/abstract/document/11106087",
            pdf: "https://ieeexplore.ieee.org/abstract/document/11106087",
            doi: "https://doi.org/10.1109/IPDPSW66978.2025.00175"
        },
        image: "https://res.cloudinary.com/dgec2pai8/image/upload/v1774542721/featured_merqbu.png",
        tags: ["Edge AI", "Cyber-Physical Systems", "Lingua Franca"],
        bibtex: `@inproceedings{barbuto2025edge,
  title={Edge AI in the computing continuum: Consistency and Availability at Early Design Stages},
  author={Barbuto, Vincenzo and Savaglio, Claudio and Fortino, Giancarlo and Lee, Edward A},
  booktitle={2025 IEEE International Parallel and Distributed Processing Symposium Workshops (IPDPSW)},
  pages={1120--1127},
  year={2025},
  organization={IEEE}
}`
    },
    {
        id: "dcoss2025",
        title: "Service Continuity in Healthcare Internet of Things (HIoT): An Architectural Solution",
        authors: "V Barbuto, G Tavella, P Mazzei, F Pupo, C Savaglio, G Fortino",
        venue: "DCOSS-IoT",
        type: "Conference Paper",
        year: 2025,
        abstract: "In the Healthcare Internet of Things (HIoT), wearable devices play a vital role in continuously monitoring patient vital signs but they commonly rely on an associated device—like smartphone or local base station—for data collection, processing, communication, or alert generation. This dependency compromises service continuity in the event of connectivity issues or unexpected lack of resources, due to limited mechanisms of pairing or offloading. Therefore, we present an HIoT architecture that enables continuous data collection, dynamic device association, and hybrid device-edge-cloud real-time processing, ensuring robustness and effectiveness even under challenging, evolving conditions. By combining the capabilities of wearable devices with Cloud technologies like Amazon Web Services, the proposed architecture is fault-tolerant, highly available, and compliant with security standards, thus resulting well-suited to ensure continuous healthcare services in real-world applications.",
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
        authors: "C Savaglio, V Barbuto, F Mangione, G Fortino",
        venue: "IEEE Internet of Things Magazine",
        type: "Journal Article",
        year: 2024,
        abstract: "Digital Twins (DTs) are software replicas that not only mirrors physical entities but can also proactively predict, control, optimize and simulate their behavior. Born in the manufacturing sector, this concept after an initial hype stayed untouched for decades. The rise of Internet of Things (IoT) and Artificial Intelligence (AI) enabled DT, respectively, to exchange real-world data and to fully exploit it for fulfilling its own goals. Very recently, Gener-ative AI (Gen-AI) methods started being sporadi-cally applied to DT in different contexts and with different targets. After studying the literature, in this article we provide a definition for the Gener-ative DT (GDT) which embraces main distinctive aspects and potential of current and future Gen-Al-aided DTs. In particular, we first disclose the role of Gen-AI in conciliating the model- and the data-driven approach for the development of DTs. Then, we analyze the added value of main Gen-AI architectures for maximizing the performance of DTs operating in the IoT domain and deployed in the edge-cloud continuum. Finally, we illustrate the potential of a GDT in emblematic Smart City scenarios through a use case involving the prediction of vehicles' trajectories when, due to uncontrolled events, only partial information is accessible. The outlined solution conciliates accuracy and explain-ability in the trajectory prediction with overall system robustness and effectiveness.",
        links: {
            url: "https://ieeexplore.ieee.org/abstract/document/10638534",
            pdf: "https://ieeexplore.ieee.org/abstract/document/10638534",
            doi: "https://doi.org/10.1109/IOTM.001.2400035"
        },
        image: "https://res.cloudinary.com/dgec2pai8/image/upload/v1774542856/featured_aauw1n.png",
        tags: ["Digital Twin", "Generative AI", "Smart City"],
        bibtex: `@article{savaglio2024generative,
  title={Generative digital twins: A novel approach in the iot edge-cloud continuum},
  author={Savaglio, Claudio and Barbuto, Vincenzo and Mangione, Fabrizio and Fortino, Giancarlo},
  journal={IEEE Internet of Things Magazine},
  volume={8},
  number={1},
  pages={42--48},
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
        abstract: "The rapid acceleration of urbanization underscores the urgent need for developing intelligent transportation systems (ITS) to enhance the efficiency, safety, and sustainability of urban mobility. Within this context, accurately predicting vehicle trajectories is paramount for facilitating superior traffic management and control. To this end, the paper presents an innovative architecture that combines a Long Short-Term Memory (LSTM) module with a generative artificial intelligence (Gen-AI) component, specifically the RoBERTa Transformer model. By leveraging these sophisticated architecture, the LSTM network with a recursive decoder outperforms the teacher forcing decoder on clean datasets, showing higher robustness in time-series predictions. When video data was partially missing, performance decreased, but using the RoBERTa model to reconstruct the missing data significantly improved results for both decoders (from 37% up to 92%). The reconstructed data notably enhanced the performance of the LSTM models, particularly when larger portions of the video data were absent. These findings highlight the effectiveness of data reconstruction techniques in mitigating the challenges posed by uncontrollable events (common in real ITS scenarios) which can bear to incomplete information.",
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
        authors: "C Savaglio, V Barbuto, FM Awan, R Minerva, N Crespi, G Fortino",
        venue: "ACM",
        type: "Journal Article",
        year: 2023,
        abstract: "Although Digital Twins (DTs) became very popular in industry, nowadays they represent a pre-requisite of many systems across different domains, by taking advantage of the disrupting digital technologies such as Artificial Intelligence (AI), Edge Computing and Internet of Things (IoT). In this paper we present our “opportunistic” interpretation, which advances the traditional DT concept and provides a valid support for enabling next-generation solutions in dynamic, distributed and large scale scenarios as smart cities. Indeed, by collecting simple data from the environment and by opportunistically elaborating them through AI techniques directly at the network edge (also referred to as Edge Intelligence), a digital version of a physical object can be built from the bottom up as well as dynamically manipulated and operated in a data-driven manner, thus enabling prompt responses to external stimuli and effective command actuation. To demonstrate the viability of our Opportunistic Digital Twin (ODT) a real use case focused on a traffic prediction task has been incrementally developed and presented, showing improved inference performance and reduced network latency, bandwidth and power consumption.",
        links: {
            url: "https://dl.acm.org/doi/abs/10.1145/3616014",
            pdf: "https://dl.acm.org/doi/pdf/10.1145/3616014",
            doi: "https://doi.org/10.1145/3616014"
        },
        image: "https://res.cloudinary.com/dgec2pai8/image/upload/v1774542932/featured_epzurb.jpg",
        tags: ["Digital Twin", "Edge Intelligence", "Smart City"],
        bibtex: `@article{savaglio2023opportunistic,
  title={Opportunistic digital twin: an edge intelligence enabler for smart city},
  author={Savaglio, Claudio and Barbuto, Vincenzo and Awan, Faraz Malik and Minerva, Roberto and Crespi, Noel and Fortino, Giancarlo},
  journal={ACM Transactions on Sensor Networks},
  year={2023},
  publisher={ACM New York, NY}
}`
    },
    {
        id: "edge_intelligence_survey",
        title: "Disclosing Edge Intelligence: A Systematic Meta-Survey",
        authors: "V Barbuto, C Savaglio, M Chen, G Fortino",
        venue: "MDPI",
        type: "Journal Article",
        year: 2023,
        abstract: "The Edge Intelligence (EI) paradigm has recently emerged as a promising solution to overcome the inherent limitations of cloud computing (latency, autonomy, cost, etc.) in the development and provision of next-generation Internet of Things (IoT) services. Therefore, motivated by its increasing popularity, relevant research effort was expended in order to explore, from different perspectives and at different degrees of detail, the many facets of EI. In such a context, the aim of this paper was to analyze the wide landscape on EI by providing a systematic analysis of the state-of-the-art manuscripts in the form of a tertiary study (i.e., a review of literature reviews, surveys, and mapping studies) and according to the guidelines of the PRISMA methodology. A comparison framework is, hence, provided and sound research questions outlined, aimed at exploring (for the benefit of both experts and beginners) the past, present, and future directions of the EI paradigm and its relationships with the IoT and the cloud computing worlds.",
        links: {
            url: "https://www.mdpi.com/2504-2289/7/1/44",
            pdf: "https://www.mdpi.com/2504-2289/7/1/44/pdf",
            doi: "https://doi.org/10.3390/bdcc7010044"
        },
        image: "https://res.cloudinary.com/dgec2pai8/image/upload/v1774542766/disclosing_rsyxek.webp",
        tags: ["Edge Intelligence", "Survey"],
        bibtex: `@article{barbuto2023disclosing,
  title={Disclosing edge intelligence: A systematic meta-survey},
  author={Barbuto, Vincenzo and Savaglio, Claudio and Chen, Min and Fortino, Giancarlo},
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
        abstract: "Cities have undergone significant changes due to the rapid increase in urban population, heightened demand for resources, and growing concerns over climate change. To address these challenges, digital transformation has become a necessity. Recent advancements in Artificial Intelligence (AI) and sensing techniques, such as synthetic sensing, can elevate Digital Twins (DTs) from digital copies of physical objects to effective and efficient platforms for data collection and in-situ processing. In such a scenario, this paper presents a compre-hensive approach for developing a Traffic Monitoring System (TMS) based on Edge Intelligence (EI), specifically designed for smart cities. Our approach prioritizes the placement of intelligence as close as possible to data sources, and leverages an “opportunistic” interpretation of DT (ODT), resulting in a novel and interdisciplinary strategy to re-engineering large-scale distributed smart systems. The preliminary results of the proposed system have shown that moving computation to the edge of the network provides several benefits, including (i) enhanced inference performance, (ii) reduced bandwidth and power consumption, (iii) and decreased latencies with respect to the classic cloud -centric approach.",
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
