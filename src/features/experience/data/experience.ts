/* ==========================================================
   EXPERIENCE
   ========================================================== */

export interface Experience{

    company:string;

    role:string;

    duration:string;

    location:string;

    description:string;

    technologies:string[];

}

export const experiences:Experience[]=[

    {

        company:"Swaminarayan Gurukul International School",

        role:"Computer Teacher",

        duration:"Jun 2025 - Present",

        location:"Tirupati, Andhra Pradesh",

        description:

        "Teaching programming fundamentals, Python, HTML, CSS, digital literacy and modern technology concepts while mentoring students in practical software development.",

        technologies:[

            "Python",

            "HTML",

            "CSS",

            "Programming",

            "Teaching"

        ]

    },

    {

        company:"SynthoQuest",

        role:"Cybersecurity Trainer",

        duration:"2025",

        location:"Remote",

        description:

        "Designed and delivered SOC and cybersecurity training modules covering SIEM, Threat Intelligence, Incident Response and Security Operations.",

        technologies:[

            "SOC",

            "SIEM",

            "Threat Intelligence",

            "Cybersecurity"

        ]

    },

    {

        company:"LetsUpgrade",

        role:"Student Ambassador",

        duration:"2023 - 2024",

        location:"Remote",

        description:

        "Represented the community, promoted technical learning initiatives and coordinated educational programs.",

        technologies:[

            "Leadership",

            "Community",

            "Events"

        ]

    }

];