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
        { name: "Discord", url: "https://discord.gg/fGQT4JwS", color: "#5865F2" },
        { name: "Twitter", url: "https://x.com/REDX62409212", color: "#1DA1F2" },
        { name: "Facebook", url: "https://www.facebook.com/abdullah.noor.397301", color: "#1877F2" },
        { name: "Instagram", url: "https://www.instagram.com/darxx03eh", color: "#E4405F" },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/abdullah-s-noor", color: "#0A66C2" },
        { name: "YouTube", url: "https://www.youtube.com/@abdullahnoor8836", color: "#FF0000" }
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
