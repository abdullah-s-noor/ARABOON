import React from 'react'
import { useTranslation } from 'react-i18next';
import { FaDiscord, FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

function FooterFields() {
    // Navigation Section Data
    const { t, i18n } = useTranslation();
    const navSectionOrder = ['company', 'legal', 'support', 'products'];
    const navSectionTitles = {
        company: t('footer.company'),
        legal: t('footer.legal'),
        support: t('footer.support'),
        products: t('footer.products'),
    };

    const navigationSections = {
        company: [
            t('footer.about_us'),
            t('footer.careers'),
            t('footer.press'),
            t('footer.contact')
        ],
        legal: [
            t('footer.privacy_policy'),
            t('footer.terms_of_service'),
            t('footer.content_ratings'),
            t('footer.copyrights')
        ],
        support: [
            t('footer.help_center'),
            t('footer.community_guidelines'),
            t('footer.news_events'),
            t('footer.documentation')
        ],
        products: [
            t('footer.services'),
            t('footer.features'),
            t('footer.pricing'),
            t('footer.api')
        ]
    };


    const brandInfo = {
        companyName: "ARABOON",
        trademark: t('footer.trademark'),
        serviceDescription: t('footer.serviceDescription'),
        websiteUrl: "https://araboon.vercel.app",
        legalEntity: "Araboon Inc",
        copyrightYear: 2025,
    };

    const socialLinks = [
    {
        name: "Discord",
        color: "#5865F2",
        width:120,
        accounts: [
            { label: "Our Server", url: "https://discord.gg/YuVh3avQGA" },
        ]
    },
    {
        name: "Twitter",
        color: "#1DA1F2",
        accounts: [
            // { label: "Abdullah", url: "https://x.com/REDX62409212" },
            // { label: "Project", url: "https://x.com/project_account" }
        ]
    },
    {
        width:210,
        name: "Facebook",
        color: "#1877F2",
        accounts: [
            { label: "Abdullah Noor", url: "https://www.facebook.com/abdullah.noor.397301" },
            { label: "Mahmoud A Darawsheh", url: "https://www.facebook.com/darxx03eh" },
        ]
    },
    {
        name: "Instagram",
        color: "#E4405F",
        accounts: [
            { label: "Abdullah Noor", url: "https://www.instagram.com/abdullah.s.noor" },
            { label: "Mahmoud A Darawsheh", url: "https://www.instagram.com/darxx03eh" },
        ]
    },
    {
        width:200,
        name: "LinkedIn",
        color: "#0A66C2",
        accounts: [
            { label: "Abdullah Noor", url: "https://www.linkedin.com/in/abdullah-s-noor" },
            { label: "Mahmoud Darawsheh", url: "https://www.linkedin.com/in/mahmoud-darawsheh" }
        ]
    },
    {
        name: "YouTube",
        color: "#FF0000",
        accounts: [
            // { label: "Channel", url: "https://www.youtube.com/@abdullahnoor8836" },
            // { label: "Project", url: "https://youtube.com/@example" }
        ]
    }
];


    const socialIconMap = {
        Discord: <FaDiscord />,
        Twitter: <FaTwitter />,
        Facebook: <FaFacebook />,
        Instagram: <FaInstagram />,
        LinkedIn: <FaLinkedin />,
        YouTube: <FaYoutube />
    };
    return { navigationSections, navSectionOrder, navSectionTitles, brandInfo, socialLinks, socialIconMap }
}

export default FooterFields
