import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AboutSection = ({ currentLanguage }) => {
    const content = {
        en: {
            title: "About KhetConnect",
            description: "KhetConnect is a comprehensive agricultural decision support system designed to empower farmers with data-driven insights for better crop management and sustainable farming practices.",
            version: "Version 2.1.0",
            features: [
                "Real-time soil health monitoring",
                "Weather-based crop recommendations",
                "AI-powered agricultural guidance",
                "Multilingual support for accessibility"
            ],
            certifications: "Certified by Agricultural Technology Council of India",
            testimonialTitle: "What Farmers Say",
            testimonial: "KhetConnect has helped me increase my crop yield by 25% while reducing water usage. The AI recommendations are spot-on!",
            testimonialAuthor: "Rajesh Kumar, Farmer from Punjab"
        },
        hi: {
            title: "KhetConnect के बारे में",
            description: "KhetConnect एक व्यापक कृषि निर्णय सहायता प्रणाली है जो किसानों को बेहतर फसल प्रबंधन और टिकाऊ कृषि प्रथाओं के लिए डेटा-संचालित अंतर्दृष्टि प्रदान करती है।",
            version: "संस्करण 2.1.0",
            features: [
                "वास्तविक समय मिट्टी स्वास्थ्य निगरानी",
                "मौसम आधारित फसल सिफारिशें",
                "AI-संचालित कृषि मार्गदर्शन",
                "पहुंच के लिए बहुभाषी समर्थन"
            ],
            certifications: "भारतीय कृषि प्रौद्योगिकी परिषद द्वारा प्रमाणित",
            testimonialTitle: "किसान क्या कहते हैं",
            testimonial: "KhetConnect ने मुझे पानी के उपयोग को कम करते हुए अपनी फसल की उपज 25% बढ़ाने में मदद की है। AI सिफारिशें बिल्कुल सही हैं!",
            testimonialAuthor: "राजेश कुमार, पंजाब के किसान"
        }
    };

    const currentContent = content?.[currentLanguage] || content?.en;

    const certificationBadges = [
        {
            name: "ATCI Certified",
            icon: "Award",
            color: "var(--color-success)"
        },
        {
            name: "ISO 27001",
            icon: "Shield",
            color: "var(--color-primary)"
        },
        {
            name: "Digital India",
            icon: "Smartphone",
            color: "var(--color-secondary)"
        }
    ];

    return (
        <div className="bg-card rounded-lg p-6 shadow-agricultural">
            <div className="flex items-center space-x-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Icon name="Info" size={20} color="var(--color-accent)" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-card-foreground">{currentContent?.title}</h3>
                    <p className="text-sm text-muted-foreground">{currentContent?.version}</p>
                </div>
            </div>
            <div className="space-y-6">
                {/* App Description */}
                <div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {currentContent?.description}
                    </p>
                </div>

                {/* Key Features */}
                <div>
                    <h4 className="font-medium text-sm mb-3 text-card-foreground">Key Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentContent?.features?.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                                <span className="text-sm text-muted-foreground">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Certification Badges */}
                <div>
                    <h4 className="font-medium text-sm mb-3 text-card-foreground">Certifications</h4>
                    <div className="flex flex-wrap gap-3 mb-2">
                        {certificationBadges?.map((badge, index) => (
                            <div key={index} className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg">
                                <Icon name={badge?.icon} size={16} color={badge?.color} />
                                <span className="text-xs font-medium">{badge?.name}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground">{currentContent?.certifications}</p>
                </div>

                {/* Farmer Testimonial */}
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                    <h4 className="font-medium text-sm mb-3 text-card-foreground">{currentContent?.testimonialTitle}</h4>
                    <div className="flex items-start space-x-3">
                        <Image
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                            alt="Farmer testimonial"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <p className="text-sm text-muted-foreground italic mb-2">
                                "{currentContent?.testimonial}"
                            </p>
                            <p className="text-xs font-medium text-primary">
                                — {currentContent?.testimonialAuthor}
                            </p>
                        </div>
                    </div>
                </div>

                {/* App Info */}
                <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span></span>
                        <span>© {new Date()?.getFullYear()} KhetConnect</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;